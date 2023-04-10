import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as oracleDb from 'oracledb';
import WinstonLoggerService from '../logger/logger.service';
import { ExecProcedureArgs } from './oracle.interfaces';

@Injectable()
export class OracleService implements OnModuleInit, OnModuleDestroy {

  constructor(
    private readonly config: ConfigService,
    private readonly logger: WinstonLoggerService
  ) { }

  dbPools: oracleDb.Pool = null;
  cursorType = oracleDb.CURSOR;
  numberType = oracleDb.NUMBER;
  varcharType = oracleDb.DB_TYPE_VARCHAR;
  dirBinOut = oracleDb.BIND_INOUT;
  oracleDb = oracleDb;

  async onModuleInit() {
    try {
      this.dbPools = await oracleDb.createPool({
        connectString: process.env.DDBB_JDBC_URL,
        user: process.env.DDBB_USER,
        password: process.env.DDBB_PASS,
        poolMax: Number(process.env.DDBB_MAX_POOL_SIZE) || 10,
        queueMax: 3000,
        queueTimeout: 5000,
      });
    } catch (error) {
      this.logger.error("Error connecting to database", error?.message, 'Oracle');
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await oracleDb.getPool().close(10);
      process.exit(0);
    } catch (error) {
      this.logger.error("Error disconnecting from database", error?.message, 'Oracle');
      process.exit(1);
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      const connection = await this.getConnection();
      await connection.close();
      return true;
    } catch (error) {
      return false;
    }
  }

  async getConnection(): Promise<oracleDb.Connection> {
    try {
      return await this.dbPools.getConnection();
    } catch (error) {
      this.logger.warn(`Error opening connection: ${error?.message}`, 'Oracle');
      throw new Error('Database error - Could not open connection');
    }
  }

  async closeConnection(connection: oracleDb.Connection) {
    try {
      if (connection) {
        await connection.close();
      }
    } catch (error) {
      this.logger.warn(`Error closing connection: ${error?.message}`, 'Oracle');
    }
  }

  async executeSelectQuery<T>(query: string, params?: oracleDb.BindParameters) {
    const connection = await this.getConnection()

    try {
      const result = await connection.execute<T>(
        query,
        params,
        { resultSet: true, outFormat: this.oracleDb.OUT_FORMAT_OBJECT });

      const data = await result.resultSet.getRows();
      await result.resultSet.close();

      return data;
    } catch (error) {
      this.logger.error("Error executing query", error?.message, 'Oracle');
      throw error;
    } finally {
      await this.closeConnection(connection);
    }

  }

  async executeUpdateInsertDeleteQuery(query: string, params?: oracleDb.BindParameters): Promise<{ rowsAffected: number }> {
    const connection = await this.getConnection()

    try {
      const result = await connection.execute(
        query,
        params,
        { autoCommit: true }
      );

      const rowsAffected = result.rowsAffected;
      await result.resultSet?.close();
      return { rowsAffected }

    } catch (error) {
      this.logger.error("Error executing query", error?.message, 'Oracle');
      throw error;
    } finally {
      await this.closeConnection(connection);
    }
  }

  /**
   * Execute a procedure with a cursor as output
   * User is responsible for closing both the connection the any cursors in the response
   * Be careful, possible memory leaks if not closed properly
   */
  async manualExecProcedure<T>(args: ExecProcedureArgs, connection: oracleDb.Connection) {
    try {
      const procedure_call = `
      BEGIN 
        ${args.procedureName}(
          :${Object.keys(args.params)
          .map((key) => key)
          .join(',\n :')}); 
      END;
    `;

      const resultCursor = await connection.execute<T>(
        procedure_call,
        args.params,
        { autoCommit: false, outFormat: this.oracleDb.OUT_FORMAT_OBJECT }
      );

      this.handlePrcErrors(resultCursor, args);

      return resultCursor.outBinds;
    } catch (error) {
      this.logger.error("Error executing procedure", error?.message, args.procedureName);
      await connection.close();
      throw error;
    }
  }

  async execProcedure<T>(args: ExecProcedureArgs, connection?: oracleDb.Connection) {
    //Si no se recibe una conexión, se crea una nueva
    //EN ESTE CASO NO SE CIERRA LA CONEXIÓN, PORQUE SE RECIBE DESDE FUERA!!
    let connectionDefined = !!connection;
    try {
      const procedure_call = `
      BEGIN 
        ${args.procedureName}(:${Object.keys(args.params)
          .map((key) => key)
          .join(', :')}); 
      END;
    `;

      const autoCommit = args.expectedAffectedRows != undefined ? false : true;

      if (!connection) {
        connection = await this.getConnection();
      }

      const resultCursor = await connection.execute(
        procedure_call,
        {
          ...args.params,
        },
        {
          outFormat: oracleDb.OUT_FORMAT_OBJECT,
          autoCommit
        },
      );

      if (args.expectedAffectedRows != undefined) {
        if ((resultCursor as any)?.outBinds.o_filas_afectadas != args.expectedAffectedRows) {
          this.logger.error(`Error executing procedure, args: ${JSON.stringify(args)}`, `Expected ${args.expectedAffectedRows} rows affected, but ${resultCursor.rowsAffected} were affected`, 'Oracle');
          await connection.rollback();
          throw new Error("MAs filas afectadas de las esperadas");
        }
      }

      this.handlePrcErrors(resultCursor, args);
      if (!autoCommit) {
        await connection.commit();
      }
      if (args.outCursorName) {
        const result_obj = await resultCursor.outBinds[
          args.outCursorName
        ].getRows();
        await resultCursor.outBinds[args.outCursorName].close();
        return result_obj;
      }
    } catch (error) {
      this.logger.error('Error executing procedure', error?.message, 'Oracle');
      throw new error;
    } finally {
      if (!connectionDefined) {
        await this.closeConnection(connection);
      }
    }
  }

  handleOracleErrors(error: any) {
    if (error.message.includes('ORA-01403')) {
      throw new Error();
    }
  }

  private handlePrcErrors(resultCursor: any, args: any) {
    const codigoError = resultCursor?.outBinds?.o_cod_error?.toString();
    const descripcionError = resultCursor?.outBinds?.o_desc_error?.toString();
    if (codigoError == undefined || codigoError === '0') {
      return;
    }

    this.logger.error(`Error executing procedure, args: ${JSON.stringify(args)}`, resultCursor?.outBinds?.o_desc_error, 'Oracle');

    //Oracle NO_DATA_FOUND_EXCEPTION
    if (descripcionError?.includes('ORA-01403')) {
      throw new Error(codigoError);
    }

    throw new Error(descripcionError);

  }


}
