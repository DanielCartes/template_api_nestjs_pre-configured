import * as oracleDb from 'oracledb';

export interface OracleMapper {
  [key: string]: string;
}

export interface ExecProcedureArgs {
  procedureName: string;
  params?: oracleDb.BindParameters;
  mapper?: OracleMapper;
  outCursorName?: string;
  expectedAffectedRows?: number;
}
