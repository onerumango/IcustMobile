import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { DataService } from "src/app/services/data.service";
import { DomSanitizer } from '@angular/platform-browser';

export class TokenObjects {
  transactionId: any;
  accountId: string;
  productCode: string;
  transactionDate: string;
  timeSlot: string;
  phoneNumber: any;
}

@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.page.html',
  styleUrls: ['./transaction-popup.page.scss'],
})
export class TransactionPopupPage implements OnInit {
  @Input() value: any;
  data: any;
  tokenObjects = new TokenObjects();
  imageToShow: string | ArrayBuffer;
  productCode: any;
  phoneNumber: string;
  accountInfo: {};
  image: any;
  trans: any;
  // sanitizer: any;

  constructor(public navCtrl: NavController,private api: ApiService,  private modalCtrl: ModalController,private sanitizer: DomSanitizer, private shareDataService: DataService, private apiService: ApiService,  private router: Router, private toastService: ToastService,) { }

  ngOnInit() {
    console.log("Dialog Box opened");
    console.log(this.value);
    
    setTimeout(() => {
      this.generateQRCode(this.tokenObjects);
    }, 100);

    this.getData();
    this.generateQRCode(this.tokenObjects);
  }

getData(){

  this.shareDataService.getAccountInfo.subscribe(data=>{
    console.log("Data",data);
    this.accountInfo = data;
    
  });


  this.apiService.getByTransactionId(this.value).subscribe(response =>{

    this.trans = JSON.stringify(response);
    // console.log("response -- "+this.data);
    // console.log(JSON.parse(this.trans));
    this.trans = JSON.parse(this.trans);
    console.log('trans', this.trans);
    console.log("working fine sucessfull")

    let objectURL = 'data:image/jpeg;base64,' + this.trans.qrCodeImage
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(this.image);
  });
}

generateQRCode(token){
  
  this.api.generateQRCode(this.tokenObjects).subscribe(tokenResp => {
    console.log("Token Response", tokenResp);
    this.createImageFromBlob(tokenResp);
    },
      err => {
        console.log("err : ", err);

      });

  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      console.log("i->",image)
      reader.readAsDataURL(image);
    }
  }

 async next() {
    console.log("before");
    this.router.navigate(['tabs']);
  
      await this.modalCtrl.dismiss();
    console.log("after",this.router); 
  }

 async addToWallet() {
    this.toastService.showToast("Added Successfully!");
    this.router.navigate(['tabs']);
    await this.modalCtrl.dismiss();
  }
}
