import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForexTransactionPageRoutingModule } from './forex-transaction-routing.module';

import { ForexTransactionPage } from './forex-transaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForexTransactionPageRoutingModule
  ],
  declarations: [ForexTransactionPage]
})
export class ForexTransactionPageModule {}
