import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanPaymentPageRoutingModule } from './loan-payment-routing.module';

import { LoanPaymentPage } from './loan-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoanPaymentPageRoutingModule
  ],
  declarations: [LoanPaymentPage]
})
export class LoanPaymentPageModule {}
