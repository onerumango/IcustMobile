import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { ApiService } from 'src/app/services/api.service';
export class TokenObjects {

  accountId:string;
  productCode:string;
  transactionDate:string;
  timeSlot:string;
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

  constructor(private router:Router,private api: ApiService) {
    this.myAngularxQrCode = 'Your QR code data string';
   }

  ngOnInit() {
    this.generateQRCode(this.tokenObjects);
    localStorage.getItem('AccountNumber');
    console.log(localStorage.getItem('AccountNumber'));
    localStorage.getItem('TransactionDate');

    console.log(localStorage.getItem('TransactionDate'));
    localStorage.getItem('TransactionTime');
    console.log(localStorage.getItem('TransactionTime'));
    this.transAmount=localStorage.getItem('TransactionAmount');
    this.transDate= localStorage.getItem('TransactionDate');
    this.transTime= localStorage.getItem('TransactionTime');
   

    
    
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
  this.tokenObjects.productCode='CHD';
  console.log(this.tokenObjects)
  console.log(this.tokenObjects.timeSlot);
  this.api.generateQRCode(this.tokenObjects).subscribe((TokenResp : any) => {
    console.log("Token created",TokenResp);
    this.tokenResponse = TokenResp;
    // const imageToBase64 = require('image-to-base64');
    // imageToBase64(this.tokenResponse) // Image URL
    // .then(
    //     (response) => {
    //         console.log(response); // "iVBORw0KGgoAAAANSwCAIA..."
    //     }
    // )
    // .catch(
    //     (error) => {
    //         console.log(error); // Logs an error if there was one
    //     }
    // )
  
    },
    err=>
    {
      console.log("err",err)
      
    });
    // if(this.tokenResponse !== null){
    //   this.router.navigate(['/tabs/home']);
  
    // }
    
}
}
