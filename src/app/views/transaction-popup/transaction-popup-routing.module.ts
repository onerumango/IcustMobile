import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionPopupPage } from './transaction-popup.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionPopupPageRoutingModule {}
