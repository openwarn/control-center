import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { flatMap, map, catchError } from 'rxjs/operators';
import { HealthStatus } from './health-status.enum';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthStatusService {

  public static READINESS_PROBE_INTERVAL = 1200; // ms

  constructor(
    private httpClient: HttpClient
  ) { }


  service(host: string): Observable<any> {

    return interval(HealthStatusService.READINESS_PROBE_INTERVAL)
     .pipe(
       flatMap(() => this.httpClient.get(host + '/health'))
      )
      .pipe(
        map(
          result => {
            if (result['status'] && result['status'] === 'ok') {
              return HealthStatus.UP;
            } else {
              return HealthStatus.DOWN;
            }
          }
       )
      ).pipe(
        catchError(
          (error) => HealthStatus.DOWN
        )
      );
  }

}
