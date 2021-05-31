import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChequedepositPage } from './chequedeposit.page';

const routes: Routes = [
  {
    path: '',
    component: ChequedepositPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChequedepositPageRoutingModule {}
