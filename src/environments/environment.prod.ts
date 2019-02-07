export const environment = {
  production: true,
  services: {
    warningDistribution: {
      baseUrl: 'http://localhost:9101' // TODO: Umleitung über Gateway
    },
    webdisseminator: {
      baseUrl: 'http://localhost:9201' // TODO: Umleitung über Gateway
    }
  }
};
