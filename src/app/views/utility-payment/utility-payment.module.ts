import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilityPaymentPageRoutingModule } from './utility-payment-routing.module';

import { UtilityPaymentPage } from './utility-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UtilityPaymentPageRoutingModule
  ],
  declarations: [UtilityPaymentPage]
})
export class UtilityPaymentPageModule {}
