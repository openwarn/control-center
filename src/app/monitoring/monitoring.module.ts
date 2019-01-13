import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HealthStatusService } from './health-status.service';
import { HealthStatusBoardComponent } from './health-status-board/health-status-board.component';
import { MatListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HealthStatusBoardComponent],
  imports: [
    CommonModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [
    HealthStatusService
  ]
})
export class MonitoringModule { }
