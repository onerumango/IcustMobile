import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenGenerationPage } from './token-generation.page';

const routes: Routes = [
  {
    path: '',
    component: TokenGenerationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenGenerationPageRoutingModule {}
