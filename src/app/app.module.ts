import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { rootRouterConfig } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),HttpClientModule, BrowserAnimationsModule,RouterModule.forRoot(rootRouterConfig, { useHash: true, relativeLinkResolution: 'legacy' })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},Geolocation],
  bootstrap: [AppComponent],
})
export class AppModule {}
