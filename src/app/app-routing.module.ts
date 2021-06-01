import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
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
  },
  {
    path: 'operation',
    loadChildren: () => import('./views/operation/operation.module').then( m => m.OperationPageModule)
  },
  {
    path: 'cashdeposit',
    loadChildren: () => import('./views/cashdeposit/cashdeposit.module').then( m => m.CashdepositPageModule)
  },
  {
    path: 'chequewithdrawal',
    loadChildren: () => import('./views/chequewithdrawal/chequewithdrawal.module').then( m => m.ChequewithdrawalPageModule)
  },
  {
    path: 'chequedeposit',
    loadChildren: () => import('./views/chequedeposit/chequedeposit.module').then( m => m.ChequedepositPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./views/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  // {
  //   path: 'transaction',
  //   loadChildren: () => import('./views/transaction/transaction.module').then( m => m.TransactionPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./views/profile/profile.module').then( m => m.ProfilePageModule)
  // },

  
  // {
  //   path: 'home',
  //   loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  // },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
