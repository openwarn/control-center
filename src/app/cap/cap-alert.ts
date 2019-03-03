import { AlertInfo } from './alert-info';
import { AlertInterface } from './interface-definitions/alert-interface';

/* tslint:disable: no-use-before-declare */
export class CapAlert implements AlertInterface {
    public alertId: string;
    public senderId: string;
    public scope: string;
    public status: string;
    public msgType: string;
    public note: string;
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

    static builder(): CapAlertBuilder {
        return new CapAlertBuilder();
    }
}

class CapAlertBuilder {
    private alert: CapAlert;

    constructor() {
        this.alert = new CapAlert();
    }

    alertId(identifier: string) {
        this.alert.alertId = identifier;
        return this;
    }

    senderId(identifier: string) {
        this.alert.senderId = identifier;
        return this;
    }

    scope(scope: string) {
        this.alert.scope = scope;
        return this;
    }

    status(status: string) {
        this.alert.status = status;
        return this;
    }

    msgType(type: string) {
        this.alert.msgType = type;
        return this;
    }

    note(note: string) {
        this.alert.note = note;
        return this;
    }

    originatedAt(dateTime: Date) {
        this.alert.originatedAt = dateTime;
        return this;
    }

    category(category: string) {
        this.alert.category = category;
        return this;
    }

    urgency(urgency: string) {
        this.alert.urgency = urgency;
        return this;
    }

    severity(severity: string) {
        this.alert.severity = severity;
        return this;
    }

    certainty(identifier: string) {
        this.alert.certainty = identifier;
        return this;
    }

    responseType(responseType: string) {
        this.alert.responseType = responseType;
        return this;
    }

    addInfoBlock(alertInfo: AlertInfo) {
        this.alert.alertInfos.push(alertInfo);
        return this;
    }

    build(): CapAlert {
        return this.alert;
    }
}
