import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { IonicModule } from '@ionic/angular';
import { WalletListComponent } from './wallet-list/wallet-list.component';
import { WalletPopupComponent } from './wallet-popup/wallet-popup.component';


@NgModule({
  declarations: [
    WalletListComponent,
    WalletPopupComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
