import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSpawnerComponent } from './dashboard-spawner.component';

describe('DashboardSpawnerComponent', () => {
  let component: DashboardSpawnerComponent;
  let fixture: ComponentFixture<DashboardSpawnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSpawnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSpawnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
