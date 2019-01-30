import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CapDeliveryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  deliver(capXml: string): Observable<any> {
    const url = environment.services.warningDistribution.baseUrl + '/api/v1/alerts';
    return this.httpClient.post(
      url, {
      xml: capXml
    });
  }
}
