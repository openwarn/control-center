import { InfoInterface } from './interface-definitions/info-interface';

export class AlertInfo implements InfoInterface {
    public language: string;
    public headline: string;
    public areaDescription: string;
}
