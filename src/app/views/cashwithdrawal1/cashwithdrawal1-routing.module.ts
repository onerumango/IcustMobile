import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cashwithdrawal1Page } from './cashwithdrawal1.page';

const routes: Routes = [
  {
    path: '',
    component: Cashwithdrawal1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cashwithdrawal1PageRoutingModule {}
