import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequewithdrawalPageRoutingModule } from './chequewithdrawal-routing.module';

import { ChequewithdrawalPage } from './chequewithdrawal.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { OperationPage } from '../operation/operation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ChequewithdrawalPageRoutingModule,
    NgxFlagPickerModule
  ],
  declarations: [ChequewithdrawalPage,OperationPage]
})
export class ChequewithdrawalPageModule {}
