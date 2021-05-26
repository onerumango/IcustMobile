import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanPaymentPageRoutingModule } from './loan-payment-routing.module';

import { LoanPaymentPage } from './loan-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanPaymentPageRoutingModule
  ],
  declarations: [LoanPaymentPage]
})
export class LoanPaymentPageModule {}
