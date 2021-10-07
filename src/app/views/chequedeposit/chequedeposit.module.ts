import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChequedepositPageRoutingModule } from './chequedeposit-routing.module';

import { ChequedepositPage } from './chequedeposit.page';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxFlagPickerModule,
    ChequedepositPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    ChequedepositPage
  ]
})
export class ChequedepositPageModule {}
