export const environment = {
  production: true,
  services: {
    dummy: {
      baseUrl: 'http://localhost:5000' // TODO: Umleitung über Gateway
    },
    warningDistribution: {
      baseUrl: 'http://localhost:9101' // TODO: Umleitung über Gateway
    },
    nodeDummy: {
      baseUrl: 'http://localhost:3000' // TODO: Entfernen nach Testphase
    }
  }
};
