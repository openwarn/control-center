import { InfoInterface } from './interface-definitions/info-interface';

/* tslint:disable: no-use-before-declare */
export class AlertInfo implements InfoInterface {
    public language: string;
    public headline: string;
    public event?: string;
    public description?: string;
    public areaDescription?: string;

    static builder(): AlertInfoBuilder {
        return new AlertInfoBuilder();
    }
}

class AlertInfoBuilder {
    private alertInfo: AlertInfo;

    constructor() {
        this.alertInfo = new AlertInfo();
    }

    language(language: string) {
        this.alertInfo.language = language;
        return this;
    }

    event(event: string) {
        this.alertInfo.event = event;
        return this;
    }

    headline(headline: string) {
        this.alertInfo.headline = headline;
        return this;
    }

    description(description: string) {
        this.alertInfo.description = description;
        return this;
    }

    areaDescription(areaDescription: string) {
        this.alertInfo.areaDescription = areaDescription;
        return this;
    }

    build(): AlertInfo {
        return this.alertInfo;
    }
}
