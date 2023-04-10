export interface OS {
  EEVV_NMR_ID: number;
  EEVV_NMR_SERIE: number;
  OSER_NMBR_EMBA: string;
  OSER_CNT_PIEZAS: number;
  OSER_DIR_RGN_ESTADO_DEST: string,
  OSER_DIR_COMUNA_DEST: string,
  OSER_DIR_CALLE_DEST: string,
  OSER_DIR_NMR_DEST: string,
  OSER_DIR_BLOCK_DEST: string,
  OSER_DIR_DEPTO_DEST: string,
  OSER_DIR_PISO_DEST: string,
  PSTA_CDG_DESTINO: string,
  OSER_DIRECCION_DEST_NORMALIZADA: string,
  OSER_CDG_POSTAL_DEST: string,
  OSER_DIRECCION_DEST: string;
  LATLONG?: string;
  LATITUD: number;
  LONGITUD: number;
  LATITUD_EVENTO: number | null;
  LONGITUD_EVENTO: number | null;
  OSER_NMBR_DEST: string;
  RUT_DEST: string;
  CTA_CTE_EMBARCADOR: string;
  CODIGO_COMUNA: number;
  BASE_CDG: string;
  COMUNA: string;
  ALTO: number;
  ANCHO: number;
  LARGO: number;
  PESO: number;
  /**
   * Código ruta
   */
  CGRT_CDG: number,
  /**
   * Folio Ruta
   */
  HJRT_FOLIO: string,
  //Campos de cuenta corriente
  TPCL_CDG_DEST: number;
  CLHL_CDG_DEST: number;
  CLHL_SCRS_DEST: number;
  CTA_CTE_DEST: OserCuentaCorriente;
  OFCN_CDG: string;
  BDGA_CDG: string;
}

export interface PuntoBX {
  CDG_PUNTO_BX: number;
  GEOL_LATITUD: number;
  GEOL_LONGITUD: number;
  DIRECCION: string;
}

export interface DatosExtraPickup {
  DRCL_DIR_RGN_ESTADO: string,
  DRCL_DIR_COMUNA: string,
  DRCL_DIR_CALLE: string,
  DRCL_DIR_NMR: string,
  DRCL_DIR_BLOCK: string,
  DIR_DEPTO: string,
  DIR_PISO: string,
  CLHL_CDG: string,
  CLHL_SCRS: string,
  CDDS_CDG_IATA: string,
  DRCL_DIRECCION: string,
}

export interface PinchazoOS {
  OSER_EEVV_NMR_ID: number;
  TPEX_CDG?: string;
  TPEV_CDG?: string;
  PZMV_FCH: string;
}

export enum PinchazosUltimaMilla {
  NH = 'NH',
  NC = 'NC'
}

export interface Coordinates {
  latitude: number,
  longitude: number;
}

export interface OserCuentaCorriente {
  TPCL_CDG_DEST: number;
  CLHL_CDG_DEST: number;
  CLHL_SCRS_DEST: number;
}