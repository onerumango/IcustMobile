import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashwithdrawalPageRoutingModule } from './cashwithdrawal-routing.module';

import { CashwithdrawalPage } from './cashwithdrawal.page';

import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CashwithdrawalPageRoutingModule,
    NgxFlagPickerModule,
    HttpClientModule,
    ComponentsModule
  ],
  declarations: [CashwithdrawalPage],
  
})
export class CashwithdrawalPageModule {}
