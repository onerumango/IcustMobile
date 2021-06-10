import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashwithdrawalPageRoutingModule } from './cashwithdrawal-routing.module';

import { CashwithdrawalPage } from './cashwithdrawal.page';


import { OperationPage } from '../operation/operation.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CashwithdrawalPageRoutingModule,
    NgxFlagPickerModule
  ],
  declarations: [CashwithdrawalPage],
  
})
export class CashwithdrawalPageModule {}
