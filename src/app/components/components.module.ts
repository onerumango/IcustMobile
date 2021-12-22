import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './branch/branch.component';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
import { MapComponent } from './map/map.component';
import { TimeSlotsComponent } from './time-slots/time-slots.component';
import { SearchComponent } from './search/search.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    BranchComponent,
    AvatarPhotoComponent,
    TimeSlotsComponent,
    MapComponent,
    SearchComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    BranchComponent,
    AvatarPhotoComponent,
    MapComponent,
    TimeSlotsComponent,
    SearchComponent
  ]
})
export class ComponentsModule { }
