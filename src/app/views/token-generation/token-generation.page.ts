import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ApiService } from 'src/app/services/api.service';
import { __assign } from 'tslib';
// import { setTimeout } from 'timers';
export class TokenObjects {

  accountId:string;
  productCode:string;
  transactionDate:string;
  timeSlot:string;
  phoneNumber:any;
}
@Component({
  selector: 'app-token-generation',
  templateUrl: './token-generation.page.html',
  styleUrls: ['./token-generation.page.scss'],
})
export class TokenGenerationPage implements OnInit {
  tokenObjects =new TokenObjects();
  tokenResponse: any;
  transAmount:any;
  transDate:any;
  transTime:any;
  public myAngularxQrCode: string = null;
  blobUrl: any ;
  imageToShow: any;
  branch: string;
  phoneNumber: string;
  productCode: any;

  constructor(private router:Router,private api: ApiService) {
    this.myAngularxQrCode = 'Your QR code data string';
   }

  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    this.api.getIndex().subscribe(resp => {
      console.log(resp.index)
    this.assignProductCode(resp.index);
      })
    setTimeout(() => {
      this.generateQRCode(this.tokenObjects);
    }, 100);
    localStorage.getItem('AccountNumber');
    localStorage.getItem('TransactionDate');

    localStorage.getItem('TransactionTime');
    console.log(localStorage.getItem('TransactionTime'));
    this.transAmount=localStorage.getItem('TransactionAmount');
    this.transDate= localStorage.getItem('TransactionDate');
    this.transTime= localStorage.getItem('TransactionTime');
    this.branch=localStorage.getItem('TransactionBranch');
    

    console.log( this.transAmount, this.transDate,this.transTime,this.branch
      )
    
  }
  assignProductCode(index: any) {
    this.productCode=index;
  }
next()
{
  this.router.navigate(['tabs']);
}

generateQRCode(token){
  console.log("Token",token);
  
  this.tokenObjects.accountId=localStorage.getItem('AccountNumber');
  this.tokenObjects.transactionDate= moment(new Date(localStorage.getItem('TransactionDate'))).format("DD-MM-YYYY");
  this.tokenObjects.transactionDate=localStorage.getItem('TransactionDate');
// this.tokenObjects.timeSlot=moment(new Date(localStorage.getItem('TransactionTime'))).format("MM/DD/YYYY hh:mm:ss a");
 
  this.tokenObjects.timeSlot=localStorage.getItem('TransactionTime');
  this.tokenObjects.productCode=this.productCode;
  this.tokenObjects.phoneNumber=this.phoneNumber;

  this.api.generateQRCode(this.tokenObjects).subscribe(tokenResp => {
    console.log("Token Response", tokenResp);
    this.createImageFromBlob(tokenResp);
    },
    err=>
    {
      console.log("err : ",err);
     
    });
    
}

createImageFromBlob(image: Blob) {
   let reader = new FileReader();
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}
}
