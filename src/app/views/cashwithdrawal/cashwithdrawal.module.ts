import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashwithdrawalPageRoutingModule } from './cashwithdrawal-routing.module';

import { CashwithdrawalPage } from './cashwithdrawal.page';


import { OperationPage } from '../operation/operation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CashwithdrawalPageRoutingModule
  ],
  declarations: [CashwithdrawalPage,OperationPage
    
  ],
  
})
export class CashwithdrawalPageModule {}
