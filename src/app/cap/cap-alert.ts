import { AlertInfo } from './alert-info';
import { AlertInterface } from './interface-definitions/alert-interface';

export class CapAlert implements AlertInterface {
    public senderId: string;
    public alertId: string;
    public scope: string;
    public event: string;
    public status: string;
    public msgType: string;
    public originatedAt: Date;
    public category: string;
    public urgency: string;
    public severity: string;
    public certainty: string;
    public responseType: string;
    public alertInfos: Array<AlertInfo>;

    constructor() {
        this.alertInfos = [];
    }
}
