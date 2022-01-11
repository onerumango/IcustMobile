import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPopupPageRoutingModule } from './transaction-popup-routing.module';

import { TransactionPopupPage } from './transaction-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionPopupPageRoutingModule
  ],
  declarations: [TransactionPopupPage]
})
export class TransactionPopupPageModule {}
