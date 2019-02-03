import { InfoInterface } from './info-interface';

export interface AlertInterface {
    senderId: string;
    alertId: string;
    scope: string;
    event: string;
    status: string;
    msgType: string;
    originatedAt: Date;
    category: string;
    urgency: string;
    severity: string;
    certainty: string;
    responseType: string;
    alertInfos?: Array<InfoInterface>;
}
