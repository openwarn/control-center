import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { HealthStatus } from './health-status.enum';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthStatusService {

  public static READINESS_PROBE_INTERVAL = 2000; // ms

  private dummyHealthStatus: BehaviorSubject<HealthStatus> | null;
  private dummyHealthHttpSubscription: Subscription;

  constructor(
    private httpClient: HttpClient
  ) {}

  private initHealthStatusObservation() {
    interval(HealthStatusService.READINESS_PROBE_INTERVAL).subscribe(
      () => {
        this.dummyHealthHttpSubscription = this.httpClient.get(environment.services.dummy.baseUrl + '/health').subscribe(
          result => {
            if (result['status'] && result['status'] == 'ok') {
              this.dummyHealthStatus.next(HealthStatus.UP);
            } else {
              this.dummyHealthStatus.next(HealthStatus.DOWN);
            }
          },
          (error) => {
            this.dummyHealthStatus.next(HealthStatus.DOWN);
          }
        );
      }
    );
  }

  observeDummyHealthStatus(): Observable<HealthStatus> {
    if (!this.dummyHealthStatus) {
      this.dummyHealthStatus = new BehaviorSubject<HealthStatus>(HealthStatus.UNKNOWN);
      this.initHealthStatusObservation();
    }
    return this.dummyHealthStatus;
  }

  stopMonitoring(): void {
    this.dummyHealthHttpSubscription.unsubscribe();
    this.dummyHealthStatus = null;
  }

}
