import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, Platform } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonserviceService } from 'src/app/services/commonservice.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { DataService } from 'src/app/services/data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('file') fileInput: ElementRef;
  flag: boolean;
  currentImage: any;
  clickedImage: string;
  phoneNumber: string;
  fullName: any;
  email: any;
  profileData: any;
  image: any;
  formData: any;
  selectedFile: File;
  progress: number;
  customerId: any;
  showLoader: boolean;

  constructor(private api: ApiService, public platform: Platform,
    public actionSheetController: ActionSheetController, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef,
    private camera: Camera, private router: Router, private photoService: PhotoService,
    private commonService: CommonserviceService,
    private dataService: DataService,
    private alert: AlertController,
    private toastService: ToastService) { }

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  ngOnInit() {
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber", this.phoneNumber)

    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in home', resp);
      this.formData = resp;
      console.log('form :: ', this.formData)
      this.commonService.sendProfileInfo(resp);
      this.customerId = resp.customerId;
      this.assign(resp.firstName, resp.middleName, resp.lastName, resp.primaryEmailAdress);
      this.getProfilePicture(resp.customerId);
    })

    this.dataService.getAvatarUrl.subscribe(data => {
      if (data != null) {
        this.image = data;
        this.cdr.markForCheck();
      }
    });

  }

  assign(firstName: any, middleName: any, lastName: any, email) {
    if (middleName == null) {
      this.fullName = firstName + ' ' + lastName;
    }
    else {
      this.fullName = firstName + ' ' + middleName + ' ' + lastName;
      console.log("full name", this.fullName)
    }
    this.email = email;
  }
  settings() {
    this.router.navigate(['change-password']);
  }
  account() {
    this.router.navigate(['account']);
  }
  menu() {
    this.flag = true;

    //  document.body.style.backgroundColor = "yellow";
    //  document.getElementById("pix").style.mask="yellow"
    // document.getElementById("form").style.backgroundColor="yellow"
    // document.getElementById("name").style.backgroundColor="yellow"
  }
  getProfilePicture(customerId) {
    this.api.getProfileDetails(customerId)
      .subscribe((data: any) => {
        this.profileData = data;
        if (data.profileImage != null) {
          let objectURL = data.profileImage;
          this.image = data.profileImage != "not_available" ? this.sanitizer.bypassSecurityTrustUrl(objectURL) : undefined;;
        } else {
          this.image = null;
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

  cancel() {
    this.flag = false;

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
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [{
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
          // this.takePhoto(0);
          this.fileInput.nativeElement.click();
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
  goToHelp() {
    this.router.navigate(['help']);
  }
  goToFaq() {
    this.router.navigate(['faq']);
  }

  goToWallet() {
    this.router.navigate(['/wallet']);
  }

  fileSelected(event) {
    const file = event.target.files ? event.target.files[0] : '';
    this.selectedFile = file;

    let size = event.target.files[0].size;
    this.toastService.showToast(`profile picture will take time to load since the upload file size is ${this.formatBytes(size, 2)}`);
    this.uploadFile(file);
  }
  formatBytes(bytes, decimals) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  uploadFile(file: File) {

    this.showLoader = true;

    const formData: FormData = new FormData();
    let payload: any = {
      "documentName": "Profile",
      "documentType": 1,
      "fileType": file.type,
      "fileName": file.name,
      "customerId": this.customerId
    };
    formData.append('file', file);
    formData.append('data', JSON.stringify(payload));

    this.api.uploadProfilePicture(formData)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          let avatarUrl = event.body.fileUrl;
          this.showLoader = false;
          localStorage.setItem('avatarUrl', avatarUrl);
          this.dataService.shareAvatarUrl(avatarUrl);
          this.toastService.showToast("File Uploaded Successfully!");
        }
        this.cdr.markForCheck();
      }, (err: any) => {
        this.progress = 0;
        this.showLoader = false;
        this.selectedFile = null;
      })
  }


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


  takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }


  async logoutApp() {
    let alret = await this.alert.create({
      subHeader: "Do you want to Sign Out",
      buttons: [
        {
          text: "Yes",
          handler: () => {
            this.logOut();
          }
        },
        {
          text: "No"
        }
      ],
    });
    await alret.present();
  }


  logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["/login"]).then(_ => {
      window.location.reload();
    });
  }

}


