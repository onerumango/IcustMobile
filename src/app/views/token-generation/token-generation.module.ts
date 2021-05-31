import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenGenerationPageRoutingModule } from './token-generation-routing.module';

import { TokenGenerationPage } from './token-generation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokenGenerationPageRoutingModule
  ],
  declarations: [TokenGenerationPage]
})
export class TokenGenerationPageModule {}
