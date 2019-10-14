import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

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
import { ReceivedWarningService } from '../cap/received-warning.service';

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
        MatSelectModule,
        MatBadgeModule,
        MatExpansionModule
      ],
      providers: [
        ReceivedWarningService
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
