import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanPaymentPage } from './loan-payment.page';

const routes: Routes = [
  {
    path: '',
    component: LoanPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanPaymentPageRoutingModule {}
