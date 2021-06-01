import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';



const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            // loadChildren: '../views/others/home/home.module#HomePageModule'
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
            // loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'transaction',
        children: [
          {
            path: '',
            // loadChildren: '../tab1/tab1.module#Tab1PageModule'
            loadChildren: () => import('../transaction/transaction.module').then( m => m.TransactionPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            // loadChildren: '../tab1/tab1.module#Tab1PageModule'
            loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
