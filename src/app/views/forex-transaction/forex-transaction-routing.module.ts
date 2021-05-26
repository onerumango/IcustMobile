import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForexTransactionPage } from './forex-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: ForexTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForexTransactionPageRoutingModule {}
