import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'loan-payment',
    loadChildren: () => import('./views/loan-payment/loan-payment.module').then( m => m.LoanPaymentPageModule)
  },
  {
    path: 'forex-transaction',
    loadChildren: () => import('./views/forex-transaction/forex-transaction.module').then( m => m.ForexTransactionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
