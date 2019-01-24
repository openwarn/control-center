import { AlertInfo } from './alert-info';

export class CapAlert {
    public senderId: string;
    public alertId: string;
    public scope: string;
    public status: string;
    public msgType: string;
    public category: string;
    public urgency: string;
    public severity: string;
    public certainty: string;
    public responseType: string;
    public alertInfos: Array<AlertInfo>;
}
