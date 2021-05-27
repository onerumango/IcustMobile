import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cashwithdrawal1PageRoutingModule } from './cashwithdrawal1-routing.module';

import { Cashwithdrawal1Page } from './cashwithdrawal1.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxFlagPickerModule,
    Cashwithdrawal1PageRoutingModule
  ],
  declarations: [Cashwithdrawal1Page]
})
export class Cashwithdrawal1PageModule {}
