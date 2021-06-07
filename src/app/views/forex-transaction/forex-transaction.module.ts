import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForexTransactionPageRoutingModule } from './forex-transaction-routing.module';

import { ForexTransactionPage } from './forex-transaction.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForexTransactionPageRoutingModule,
    ReactiveFormsModule,
    NgxFlagPickerModule,
    
    
  ],
  declarations: [ForexTransactionPage]
})
export class ForexTransactionPageModule {}
