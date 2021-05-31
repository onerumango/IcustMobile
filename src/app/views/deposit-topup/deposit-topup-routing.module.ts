import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositTopupPage } from './deposit-topup.page';

const routes: Routes = [
  {
    path: '',
    component: DepositTopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositTopupPageRoutingModule {}
