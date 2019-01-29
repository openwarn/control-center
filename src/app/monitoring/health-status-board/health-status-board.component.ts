import { Component, OnInit, OnDestroy } from '@angular/core';
import { HealthStatusService } from '../health-status.service';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HealthStatus } from '../health-status.enum';

@Component({
  selector: 'app-health-status-board',
  templateUrl: './health-status-board.component.html',
  styleUrls: ['./health-status-board.component.scss']
})
export class HealthStatusBoardComponent implements OnInit {

  dummyServiceStatus: Observable<HealthStatus>;
  nodeDummyServiceStatus: Observable<HealthStatus>;

  constructor(
    private healthStatusService: HealthStatusService
  ) {
    this.dummyServiceStatus = this.healthStatusService.service(environment.services.dummy.baseUrl);
    this.nodeDummyServiceStatus = this.healthStatusService.service(environment.services.dummy.baseUrl);
  }

  ngOnInit() {
  }
}
