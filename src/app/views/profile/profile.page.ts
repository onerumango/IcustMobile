import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/services/api.service';
import { __assign } from 'tslib';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonserviceService } from 'src/app/services/commonservice.service';



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
  formData: any;
  constructor(private api: ApiService,public platform:Platform,
    public actionSheetController: ActionSheetController,private sanitizer: DomSanitizer,private cdr:ChangeDetectorRef,
    private camera: Camera,private router:Router,private photoService: PhotoService,
    private commonService:CommonserviceService) { }
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
     this.formData=resp;
     console.log('form :: ',this.formData)
     this.commonService.sendProfileInfo(resp);
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
          console.log(" profile Image",this.profileData.profileImage.fileUrl);
          if (data.profileImage && data.profileImage.fileUrl != null) {
           // let objectURL = 'data:image/jpeg;base64,' + data.profileImage.fileName;
            let objectURL =  data.profileImage.fileUrl;
            this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }else{
            this.image=null;
          }
          this.cdr.markForCheck();
        }, (error: any) => {
          console.log(error);
        });
    }

    getRandomColor(idx) {
      var col0 = '#0d856b';
      var col1 = '#d66f1b';
      var col2 = '#9f52e7';
      var col3 = '#e9318d';
      var col4 = '#1175a3';
      var col5 = '#e93131';
      var col6 = '#2316d3';
      var col7 = '#f557f5';
      var col8 = '#d6c31b';
      var col9 = '#40d61b';
  
      if ((idx % 10) == 0) return col0;
      if ((idx % 10) == 1) return col1;
      if ((idx % 10) == 2) return col2;
      if ((idx % 10) == 3) return col3;
      if ((idx % 10) == 4) return col4;
      if ((idx % 10) == 5) return col5;
      if ((idx % 10) == 6) return col6;
      if ((idx % 10) == 7) return col7;
      if ((idx % 10) == 8) return col8;
      if ((idx % 10) == 9) return col9;
      return '#d86315';
      // var randomColor = Math.floor(Math.random()*16777215).toString(16);
      // return '#' + randomColor.slice(-6);
      // var randomColor = Math.floor(0x1000000 * Math.random()).toString(16);
      // return '#' + ('000000' + randomColor).slice(-6);
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
          this.takePicture();
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
    console.log(options);

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      console.log(this.currentImage);
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

