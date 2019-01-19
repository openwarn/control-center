import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WarningCreatorComponent } from './warning-creator/warning-creator.component';
import { WarningFeedComponent } from './warning-feed/warning-feed.component';

// TODO: make routes more hierachical and resource-based
// e.g alert/create
//     alert/feed

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'alert',
    component: WarningCreatorComponent
  },
  {
    path: 'alerts',
    component: WarningFeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
