import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpPageRoutingModule } from './otp-routing.module';

import { OtpPage } from './otp.page';

import{ToastrModule, ToastrService} from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
   
    OtpPageRoutingModule,
    
    
    ToastrModule.forRoot()
    
    
  ],
  declarations: [OtpPage],
  providers:[ToastrService]
})
export class OtpPageModule {}
