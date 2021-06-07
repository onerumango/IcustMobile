import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashdepositPageRoutingModule } from './cashdeposit-routing.module';

import { CashdepositPage } from './cashdeposit.page';
import { OperationPage } from '../operation/operation.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CashdepositPageRoutingModule,
    NgxFlagPickerModule
  ],
  declarations: [CashdepositPage,OperationPage]
})
export class CashdepositPageModule {}
