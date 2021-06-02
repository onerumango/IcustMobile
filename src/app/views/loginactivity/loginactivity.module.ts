import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginactivityPageRoutingModule } from './loginactivity-routing.module';

import { LoginactivityPage } from './loginactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginactivityPageRoutingModule
  ],
  declarations: [LoginactivityPage]
})
export class LoginactivityPageModule {}
