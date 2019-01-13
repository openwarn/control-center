import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthStatusBoardComponent } from './health-status-board.component';

describe('HealthStatusBoardComponent', () => {
  let component: HealthStatusBoardComponent;
  let fixture: ComponentFixture<HealthStatusBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthStatusBoardComponent ]
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
