import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequewithdrawalPage } from './chequewithdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: ChequewithdrawalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequewithdrawalPageRoutingModule {}
