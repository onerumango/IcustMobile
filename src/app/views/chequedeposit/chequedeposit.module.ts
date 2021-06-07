import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequedepositPageRoutingModule } from './chequedeposit-routing.module';

import { ChequedepositPage } from './chequedeposit.page';
import { OperationPage } from '../operation/operation.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxFlagPickerModule,
    ChequedepositPageRoutingModule
  ],
  declarations: [ChequedepositPage,OperationPage]
})
export class ChequedepositPageModule {}
