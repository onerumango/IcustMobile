import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  flag: boolean;
  currentImage: any;
  clickedImage: string;
  constructor(public platform:Platform,public actionSheetController: ActionSheetController,private camera: Camera,private router:Router,private photoService: PhotoService) { }
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  ngOnInit() {
    
  }
  settings()
  {
    this.router.navigate(['change-password']);
  }
  account()
  {
    this.router.navigate(['account']);
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
          this.takePicture()
          console.log('Share clicked');
        }
      }, {
        text: 'Upload photo',
        // icon: 'arrow-dropright-circle',
        handler: () => {
          this.takePicture()
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
  goToHelp(){
    this.router.navigate(['help']);
  }
  goToFaq(){
    this.router.navigate(['faq']);
  }
  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
}

