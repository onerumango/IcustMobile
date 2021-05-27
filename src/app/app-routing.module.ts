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
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cashwithdrawal',
    loadChildren: () => import('./views/cashwithdrawal/cashwithdrawal.module').then( m => m.CashwithdrawalPageModule)
  },  {
    path: 'operation',
    loadChildren: () => import('./views/operation/operation.module').then( m => m.OperationPageModule)
  },
  {
    path: 'cashdeposit',
    loadChildren: () => import('./views/cashdeposit/cashdeposit.module').then( m => m.CashdepositPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
