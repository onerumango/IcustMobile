import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashdepositPage } from './cashdeposit.page';

const routes: Routes = [
  {
    path: '',
    component: CashdepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashdepositPageRoutingModule {}
