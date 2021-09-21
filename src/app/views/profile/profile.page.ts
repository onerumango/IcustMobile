import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/services/api.service';
import { __assign } from 'tslib';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  flag: boolean;
  currentImage: any;
  clickedImage: string;
  phoneNumber: string;
  fullName:any;
  email: any;
  profileData: any;
  image: Object;
  constructor(private api: ApiService,public platform:Platform,
    public actionSheetController: ActionSheetController,private sanitizer: DomSanitizer,private cdr:ChangeDetectorRef,
    private camera: Camera,private router:Router,private photoService: PhotoService) { }
  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber",this.phoneNumber)
 
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
     console.log('backend resp in home', resp);
     this.assign(resp.firstName,resp.middleName,resp.lastName,resp.primaryEmailAdress);
     this.getProfilePicture(resp.customerId);
    })
  
  }
  assign(firstName: any, middleName: any, lastName: any,email) {
    if(middleName == null){
      this.fullName=firstName+' '+lastName;
    }
   else{
   this.fullName=firstName+' '+middleName+' '+lastName;
   console.log("full name",this.fullName)
   }
   this.email=email;
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
    getProfilePicture(customerId) {
      const contentType = 'image/png';
      this.api.getProfileDetails(customerId)
        .subscribe((data: any) => {
          this.cdr.markForCheck();
          this.profileData = data;
          console.log(" profile Image",this.profileData);
          if (data.profileImage && data.profileImage.fileData != null) {
            let objectURL = 'data:image/jpeg;base64,' + data.profileImage.fileData;
            this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL)
          }else{
            this.image="";
          }
          this.cdr.markForCheck();
        }, (error: any) => {
          console.log(error);
        });
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
          this.takePhoto(0);
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
  // takePicture() {
  //   this.camera.getPicture(this.options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.clickedImage = base64Image;
  //   }, (err) => {
  //     console.log(err);
  //     // Handle error
  //   });
  // }
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }
  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}

function assign(firstName: any, middleName: any, lastName: any) {
  throw new Error('Function not implemented.');
}

