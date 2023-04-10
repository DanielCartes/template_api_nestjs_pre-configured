import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as oracleDb from 'oracledb';
import WinstonLoggerService from '../logger/logger.service';
import { OracleService } from '../oracle/oracle.service';
import { OS } from './dto/examples.dto';

@Injectable()
export class ExamplesService {

  constructor(
    private readonly config: ConfigService,
    private readonly logger: WinstonLoggerService,
    private readonly oracle: OracleService
  ) { }

  async prcOracleFunciónAuxiliar() {
    interface PRC_SIE_CREATE_RULE_OUT {
      o_rumi_seq: number;
      o_cod_error: number;
      o_desc_error: string;
    }

    //Si no entregamos el parámetro "connection" se realiza commit automaticamente
    const os = await this.oracle.execProcedure<OS>({
      procedureName: 'PKG_REGLAS_ULTIMA_MILLA.prc_obtiene_datos_os',
      params: {
        i_eevv_nmr_id: '',
        i_empr_cdg: 2000,
        i_pzas_id: '',
        o_cursor_datos_os: { dir: this.oracle.dirBinOut, type: this.oracle.cursorType },
        o_cod_error: { dir: this.oracle.dirBinOut, type: this.oracle.numberType },
        o_desc_error: { dir: this.oracle.dirBinOut, type: this.oracle.varcharType },
      },
      outCursorName: 'o_cursor_datos_os',
    });

    const connection = await this.oracle.getConnection()
    const os2 = await this.oracle.execProcedure<OS>({
      procedureName: 'PKG_REGLAS_ULTIMA_MILLA.prc_obtiene_datos_os',
      params: {
        i_eevv_nmr_id: '893892083',
        i_empr_cdg: 2000,
        i_pzas_id: '',
        o_cursor_datos_os: { dir: this.oracle.dirBinOut, type: this.oracle.cursorType },
        o_cod_error: { dir: this.oracle.dirBinOut, type: this.oracle.numberType },
        o_desc_error: { dir: this.oracle.dirBinOut, type: this.oracle.varcharType },
      },
      outCursorName: 'o_cursor_datos_os',
    }, connection);

    // Este no hace nada en un select pero si el package hiciera UPDATE, CREATE O DELETE SERIA NECESARIO
    connection.commit();
  }

  // Asi se usa la liberia oracledb directamente sin la función auxiliar
  async prcOracleManual() {
    const args = {
      procedureName: 'PKG_REGLAS_ULTIMA_MILLA.prc_obtiene_datos_os',
      params: {
        i_eevv_nmr_id: '893892083',
        i_empr_cdg: 2000,
        i_pzas_id: '30039273892',
        o_cursor_datos_os: { dir: this.oracle.dirBinOut, type: this.oracle.cursorType },
        o_cod_error: { dir: this.oracle.dirBinOut, type: this.oracle.numberType },
        o_desc_error: { dir: this.oracle.dirBinOut, type: this.oracle.varcharType },
      }
    }

    // Esto se ve raro, pero solamente genera la string para llamar al prc
    // Ejemplo: 
    // "BEGIN 
    //    PKG_REGLAS_ULTIMA_MILLA.prc_obtiene_datos_os(:i_eevv_nmr_id, :i_empr_cdg, :i_pzas_id, :o_cursor_datos_os, :o_cod_error, :o_desc_error); 
    // END;"
    const procedure_call = `
      BEGIN 
        ${args.procedureName}(:${Object.keys(args.params)
        .map((key) => key)
        .join(', :')}); 
      END;
    `;

    // Se obtiene la conexión
    const connection = await this.oracle.getConnection();

    // SE EJECUTA EL PRC
    const output = await connection.execute(
      procedure_call,
      {
        ...args.params,
      },
      {
        // Se indica que la salida es un cursor
        outFormat: oracleDb.OUT_FORMAT_OBJECT,
        // Se indica que no se hace commit automaticamente
        autoCommit: false,
      },
    );

    // Se hace commit, se puede hacer rollback si se desea
    //connection.rollback();
    connection.commit();

    const result = await output.outBinds['o_cursor_datos_os'].getRows();
    await output.outBinds['o_cursor_datos_os'].close();
    return result;
  }

  async usoLogger() {
    this.logger.log('Hola Mundo');
    this.logger.error('Error');
    this.logger.warn('Warn');
    this.logger.verbose('Verbose');
    this.logger.debug('Debug');
  }
}
