import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { Camera } from '@ionic-native/camera/ngx';
import { RouteReuseStrategy } from '@angular/router';


@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  providers: [
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  declarations: [ProfilePage]
}
)

export class ProfilePageModule {}
