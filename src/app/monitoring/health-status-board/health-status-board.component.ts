import { Component, OnInit, OnDestroy } from '@angular/core';
import { HealthStatusService } from '../health-status.service';
import { Observable } from 'rxjs';
import { HealthStatus } from '../health-status.enum';

@Component({
  selector: 'app-health-status-board',
  templateUrl: './health-status-board.component.html',
  styleUrls: ['./health-status-board.component.scss']
})
export class HealthStatusBoardComponent implements OnInit, OnDestroy {

  dummyServiceStatus: Observable<HealthStatus>;

  constructor(
    private healthStatusService: HealthStatusService
  ) {
    this.dummyServiceStatus = this.healthStatusService.observeDummyHealthStatus();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.healthStatusService.stopMonitoring();
  }

}
