# ControlCenter

ControlCenter is a component of OpenWarn. It is a sample client to test warning delivery in OpenWarn.

Alerts posted to this service must be formatted as [CAPv1.2](http://docs.oasis-open.org/emergency/cap/v1.2/CAP-v1.2-os.html).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## About OpenWarn

OpenWarn is a prototypic open-source warning system which leverages modern microservice architecture concepts
to build an modular and customizable integrated warning system.

It was created as part of the master thesis called
`Konzeption einer Softwarearchitektur für ein Nachrichtensystem zur Warnung der Bevölkerung in Gefahrensituationen` (conception of a software architecture for public warning message systems) at Technical University Ilmenau in 2019.

## Installation

Prerequisites: [Node.js](https://nodejs.org/en/) (>=10), npm version 3+.

```bash
npm install
```

### Build Docker Image

```bash
docker build -t control-center .
```

## Run

```bash
docker run -p "80:8001" control-center
```


### Run unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Configuration

Check `src/environments` for available configuration like locale and preferred languages.


## Build (Docker)

```bash
docker build -t control-center .
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Contributing

Feel free to contribute to OpenWarn by creating a pull request or adding an issue.

If you are interessted in supporting this project or building a warning system based on this software, contact me via GitHub.

## License

  [MIT](LICENSE)