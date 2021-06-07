import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositTopupPageRoutingModule } from './deposit-topup-routing.module';

import { DepositTopupPage } from './deposit-topup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositTopupPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DepositTopupPage]
})
export class DepositTopupPageModule {}
