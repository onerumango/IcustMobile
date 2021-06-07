import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginactivityPage } from './loginactivity.page';

const routes: Routes = [
  {
    path: '',
    component: LoginactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginactivityPageRoutingModule {}
