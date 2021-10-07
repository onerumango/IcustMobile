import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './branch/branch.component';
import { AvatarPhotoComponent } from './avatar-photo/avatar-photo.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    BranchComponent,
    AvatarPhotoComponent,
    MapComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    BranchComponent,
    AvatarPhotoComponent,
    MapComponent
  ]
})
export class ComponentsModule { }