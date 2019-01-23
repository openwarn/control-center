import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatBadgeModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteNavigationComponent } from './site-navigation/site-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MonitoringModule } from './monitoring/monitoring.module';
import { DashboardSpawnerComponent } from './dashboard-spawner/dashboard-spawner.component';
import { WarningCreatorComponent } from './warning-creator/warning-creator.component';
import { WarningFeedComponent } from './warning-feed/warning-feed.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LevelSliderModule } from './level-slider/level-slider.module';

@NgModule({
  declarations: [
    AppComponent,
    SiteNavigationComponent,
    DashboardComponent,
    DashboardSpawnerComponent,
    WarningCreatorComponent,
    WarningFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MonitoringModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatBadgeModule,
    LevelSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
