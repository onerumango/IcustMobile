import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashdepositPageRoutingModule } from './cashdeposit-routing.module';

import { CashdepositPage } from './cashdeposit.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CashdepositPageRoutingModule,
    NgxFlagPickerModule,
    ComponentsModule
  ],
  declarations: [CashdepositPage]
})
export class CashdepositPageModule {}
