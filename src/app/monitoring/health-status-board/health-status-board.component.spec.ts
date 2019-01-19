import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthStatusBoardComponent } from './health-status-board.component';
import { HealthStatusService } from '../health-status.service';
import { MatListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

describe('HealthStatusBoardComponent', () => {
  let component: HealthStatusBoardComponent;
  let fixture: ComponentFixture<HealthStatusBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthStatusBoardComponent ],
      imports: [
        MatListModule,
        HttpClientModule,
        CommonModule
      ],
      providers: [
        HealthStatusService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthStatusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
