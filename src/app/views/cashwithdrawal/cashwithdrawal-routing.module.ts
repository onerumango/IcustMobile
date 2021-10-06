import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashwithdrawalPage } from './cashwithdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: CashwithdrawalPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashwithdrawalPageRoutingModule {}
