import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CapAlert } from './cap-alert';
import { ReceivedWarningService } from './received-warning.service';

@Injectable({
  providedIn: 'root'
})
export class PendingWarningService {

  private items: Array<CapAlert> = [];
  private $pendingWarnings: BehaviorSubject<CapAlert[]> = new BehaviorSubject<CapAlert[]>([]);


  constructor(
    private receivedWarningService: ReceivedWarningService
  ) {
    this.update();
  }

  pendingWarnings(): Observable<CapAlert[]> {
    return this.$pendingWarnings;
  }

  addWarning(alert: CapAlert): void {
    this.items.push(alert);
    this.$pendingWarnings.next(this.items);
    // TODO: do not subscribe multiple times
    this.update();
  }

  private update() {
    this.receivedWarningService.warnings().subscribe(
      (alerts) => {
        console.log('PendingWarningService', 'got alerts from ReceivedWarningService', alerts);
        this.items = this.items.filter(
          (item) => !alerts.some(
            (alert) => item.alertId === alert.alertId
          )
        );
        this.$pendingWarnings.next(this.items);
      }
    );
  }

}
