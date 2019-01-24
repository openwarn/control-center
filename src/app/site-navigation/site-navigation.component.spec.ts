import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectChange,
  MatSelectModule,
} from '@angular/material';

import { SiteNavigationComponent } from './site-navigation.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { WarningCreatorComponent } from '../warning-creator/warning-creator.component';
import { WarningFeedComponent } from '../warning-feed/warning-feed.component';
import { HealthStatusBoardComponent } from '../monitoring/health-status-board/health-status-board.component';
import { DashboardSpawnerComponent } from '../dashboard-spawner/dashboard-spawner.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SiteNavigationComponent', () => {
  let component: SiteNavigationComponent;
  let fixture: ComponentFixture<SiteNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SiteNavigationComponent,
        DashboardComponent,
        WarningCreatorComponent,
        WarningFeedComponent,
        HealthStatusBoardComponent,
        DashboardSpawnerComponent
      ],
      imports: [
        NoopAnimationsModule,
        BrowserModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterModule,
        AppRoutingModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
