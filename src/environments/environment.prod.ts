export const environment = {
  production: true,
  locale: 'de',
  preferedLanguages: [
    'de',
    'en'
  ],
  broker: {
    alertTopic: 'alert',
  },
  services: {
    warningDistribution: {
      baseUrl: 'http://localhost:9101', // TODO: Umleitung über Gateway
      title: 'Warnmeldungsbelieferung'
    },
    webdisseminator: {
      baseUrl: 'http://localhost:9201', // TODO: Umleitung über Gateway
      title: 'Websocket-Warnmeldungsempfang'
    }
  }
};
