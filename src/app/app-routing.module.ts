import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
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

  {
    path: 'utility-payment',
    loadChildren: () => import('./views/utility-payment/utility-payment.module').then( m => m.UtilityPaymentPageModule)
  },
  {
    path: 'deposit-topup',
    loadChildren: () => import('./views/deposit-topup/deposit-topup.module').then( m => m.DepositTopupPageModule)
  },

  {
    path: 'change-password',
    loadChildren: () => import('./views/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'token-generation',
    loadChildren: () => import('./views/token-generation/token-generation.module').then( m => m.TokenGenerationPageModule)
  },
 
  {
    path: 'loginactivity',
    loadChildren: () => import('./views/loginactivity/loginactivity.module').then( m => m.LoginactivityPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./views/help/help.module').then( m => m.HelpPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./views/faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'account-edit',
    loadChildren: () => import('./views/account-edit/account-edit.module').then( m => m.AccountEditPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./views/account/account.module').then( m => m.AccountPageModule)
  },
  
];
