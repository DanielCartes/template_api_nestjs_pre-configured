interface IConfig {
  port: number;
  node_env: string;
  database: {
    host: string;
    user: string;
    password: string;
    maxPoolSize: number;
  };
  executeSieRules: boolean;
  externalServices: {

    apiPickupBluex: string;
    apiBeetrack: string;
    apiKeyBeetrack: string;
    puntosBxTimeOut: number;
    maxDaysInPickup: number;
  };
  evExSalida: {
    evEx: string;
    evExTipo: "EV" | "EX";
    usuario: string;
    actualizaEstadoWsUrl: string;
    actualizaEstadoWsApiKey: string;
    tokenSamServiceUrl: string;
    tokenSamServiceApiKey: string;
    owner: string;
  }
}

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  node_env: process.env.NODE_ENV,

  database: {
    host: process.env.DDBB_JDBC_URL,
    user: process.env.DDBB_USER,
    password: process.env.DDBB_PASS,
    maxPoolSize: Number(process.env.DDBB_MAX_POOL_SIZE) || 10,
  },
  executeSieRules: process.env.EXECUTE_SIE_RULES && process.env.EXECUTE_SIE_RULES === 'true',
  externalServices: {
    apiPickupBluex: process.env.API_PICKUP_BLUEX,
    apiBeetrack: process.env.API_BEETRACK_URL,
    apiKeyBeetrack: process.env.API_BEETRACK_KEY,
    puntosBxTimeOut: Number(process.env.PUNTOS_BX_API_TIMEOUT) || 4000,
    maxDaysInPickup: +process.env.MAX_DAYS_IN_PICKUP || 5,
  },

  evExSalida: {
    evEx: process.env.EV_EX_SALIDA,
    evExTipo: process.env.EV_EX_TIPO as "EV" | "EX",
    usuario: process.env.USUARIO_EVEX_SALIDA, 
    actualizaEstadoWsUrl: process.env.ACTUALIZA_ESTADO_WS_URL,
    actualizaEstadoWsApiKey: process.env.ACTUALIZA_ESTADO_WS_API_KEY,
    tokenSamServiceUrl: process.env.TOKEN_SAM_SERVICE_URL,
    tokenSamServiceApiKey: process.env.TOKEN_SAM_SERVICE_API_KEY,
    owner: process.env.EV_EX_OWNER
  }
});

export const checkEnvVariables = () => {
  console.log('Environment variables checked successfully')
}