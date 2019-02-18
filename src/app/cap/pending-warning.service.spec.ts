import { TestBed } from '@angular/core/testing';

import { PendingWarningService } from './pending-warning.service';
import { AlertListenerService } from './alert-listener.service';
import { CapAlert } from './cap-alert';
import { Subject, Observable } from 'rxjs';
import { ReceivedWarningService } from './received-warning.service';

class AlertListenerServiceMock {
  private $alert:  Subject<CapAlert> = new Subject<CapAlert>();

  alert(): Observable<CapAlert> {
    return this.$alert;
  }

  emitAlert(id: string) {
    this.$alert.next(CapAlert.builder().alertId(id).build());
  }
}

describe('PendingWarningService', () => {
  let service: PendingWarningService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          { provide: AlertListenerService, useClass: AlertListenerServiceMock },
          ReceivedWarningService
        ]
      },
    );
    service = TestBed.get(PendingWarningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should emit list with pending alert if one was added', () => {
    const capAlert = CapAlert.builder().alertId('expected id').build();
    service.addWarning(capAlert);
    service.pendingWarnings().subscribe(
      (pendingAlerts) => {
        expect(pendingAlerts.length).toBe(1);
        expect(pendingAlerts[0].alertId).toBe('expected id');
      },
      (err) => fail()
    );
  });

  it('should remove pending alert if actual alert has arrived', () => {
    const alertListener = TestBed.get(AlertListenerService);

    const capAlert = CapAlert.builder().alertId('expected id').build();
    service.addWarning(capAlert);
    alertListener.emitAlert('expected id');

    service.pendingWarnings().subscribe(
      (pendingAlerts) => {
        expect(pendingAlerts.length).toBe(0);
      },
      (err) => fail()
    );
  });

  it('should not add pending warning which is already actual alert', () => {
    const alertListener = TestBed.get(AlertListenerService);
    const capAlert = CapAlert.builder().alertId('known alert id').build();

    alertListener.emitAlert('known alert id');
    service.addWarning(capAlert);

    service.pendingWarnings().subscribe(
      (pendingAlerts) => {
        expect(pendingAlerts.length).toBe(0);
      },
      (err) => fail()
    );
  });

});
