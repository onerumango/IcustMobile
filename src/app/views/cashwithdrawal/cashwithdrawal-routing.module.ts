import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchPage } from './branch/branch.page';

import { CashwithdrawalPage } from './cashwithdrawal.page';

const routes: Routes = [
  {
    path: '',
    component: CashwithdrawalPage
  },{
    path: 'branch',
    component: BranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashwithdrawalPageRoutingModule {}
