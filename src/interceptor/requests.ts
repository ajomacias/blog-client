import { getToken } from "../utils/localToken";

export function requestInterceptor() {

  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    let [resource, config] = args

    config = setHeaders(config);
    
    const response = await originalFetch(resource, config);

    return response;
  };
}

function setHeaders( config : RequestInit | undefined){
  const headers = config?.headers ? {
    ...config.headers,
    'Authorization' :  `Bearer ${getToken()}`
   }
   : {
    'Authorization' : `Bearer ${getToken()}`
   }

   config = { ...config, headers }

   return config;

}
