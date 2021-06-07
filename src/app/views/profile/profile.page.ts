import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  flag: boolean;


  constructor(public actionSheetController: ActionSheetController,private router:Router,private photoService: PhotoService) { }

  ngOnInit() {
    
  }
  settings()
  {
    this.router.navigate(['change-password']);
  }
  menu()
  {
    this.flag=true;
 
      //  document.body.style.backgroundColor = "yellow";
      //  document.getElementById("pix").style.mask="yellow"
      // document.getElementById("form").style.backgroundColor="yellow"
      // document.getElementById("name").style.backgroundColor="yellow"
    }
  
  cancel()
  {
    this.flag=false;

  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
 

  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      // subHeader: 'Subtitle',
      animated: false,
      backdropDismiss: false,
      cssClass:'my-custom-class',
      mode: 'ios',
      buttons: [ {
        text: 'Take Photo',
        // icon: 'share',
        handler: () => {
          this.addPhotoToGallery()
          console.log('Share clicked');
        }
      }, {
        text: 'Upload photo',
        // icon: 'arrow-dropright-circle',
        handler: () => {
          this.addPhotoToGallery()
          console.log('Play clicked');
        }
      }, {
        text: 'Remove',
      
        role: 'destructive',
        // icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancel',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
