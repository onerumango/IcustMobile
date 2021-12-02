import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { otpModel } from '../login/login.page';

import { ToastrService } from 'ngx-toastr';
import { ToastController } from '@ionic/angular';
export class verifyotpModel {
  sourceKey: any;
  sourceValue: any;
  otp: number;
  type: any;
}
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  
  otpValue: any = null;
  otpForm: FormGroup;
  otpValid: boolean = false;
  verifyOtpModel = new verifyotpModel();
  oTpModel = new otpModel();
  otpResponse: any
  PhoneNumLogin: any;
  customerPhonenum:any;
  otpToken: number;
  constructor(private cdk: ChangeDetectorRef,private router: Router, private fb: FormBuilder, private api: ApiService ,private toastr:ToastrService,
    private toastCtrl: ToastController) {

  }

  ngOnInit() {

    this.otpForm = this.fb.group({
       phoneNo:['', [Validators.required]],
        otp: ['', [Validators.required]]

    })
    this.PhoneNumLogin = localStorage.getItem('PhoneNumLogin');
    console.log(localStorage.getItem('PhoneNumLogin'));

    this.api.getOtpToken.subscribe(otp =>{
      console.log("Subject otp",otp);
       if(otp.length === 6){
         this.otpToken = otp;

         console.log("this is otpToken", this.otpToken);
         this.otpForm.get('otp').patchValue(this.otpToken);
         this.openToast1("OTP auto populated successfully!");
       }
    })
  }
  numberOnly(event): boolean {
    console.log("event",event )
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getOtp() {

    
    this.oTpModel.source = 'customer';
    this.oTpModel.source_key = 'mobile';
    this.oTpModel.source_value = this.PhoneNumLogin;
    console.log("model", this.oTpModel);
    this.api.getOtp(this.oTpModel).subscribe(otpResp => {
      console.log("Response Success", otpResp)
      this.otpResponse = otpResp
    
      /* Added validation for un-registered mobile nummber is entered */
      console.log(this.otpResponse)
      if (this.otpResponse.otpVal.userId === "New Customer" || (this.otpResponse.otpVal.userId ==='' && this.otpResponse.otpVal.userId ===null)) {
        this.cdk.detectChanges();
        
        // this.userResp = true;
      } else {
        // this.otpResponse.otpVal.userId !='' && this.otpResponse.otpVal.userId!=null && 
        console.log('in else')
        this.openToast1('OTP has been sent again');
        this.router.navigateByUrl('/otp');
        if(otpResp && otpResp.otpVal && otpResp.otpVal.token)
        {
        this.otpForm.get('otp').patchValue(otpResp.otpVal.token);
        this.openToast1("OTP auto populated successfully!");
        }
      }
    },error=>{
      console.log('error :: ',error);
      this.openToast1('Failed to send OTP');
    })

    // this.router.navigateByUrl('/otp');

  }
 // customerPhonenum(arg0: string, customerPhonenum: any) {
   // throw new Error('Method not implemented.');
  //}
  validateOtp(otpValue) {
    console.log("Phonenumber for OTP", otpValue, otpValue.otp,this.otpToken);
  
    
    this.verifyOtpModel.sourceKey = 'mobile';
    this.verifyOtpModel.sourceValue = this.PhoneNumLogin;
    this.verifyOtpModel.otp = this.otpToken;
    this.verifyOtpModel.type = '';
    console.log("model", this.verifyOtpModel);
    this.api.verifyOtp(this.verifyOtpModel).subscribe(otpResp => {
      console.log("Response Success", otpResp)
      this.otpResponse = otpResp

      /* Validation resp */
      if (this.otpResponse.userId !== '' ||  this.otpResponse.userId !==null) {
        // this.router.navigateByUrl('/others/services');
        this.goToCashWithdrawal(this.otpForm);
      
      } else {
        this.router.navigateByUrl('/login');
      }
    },(err)=>{
      console.log(err);
      this.openToast();
      //this.toastr.error('');
    })
  }
  goBack()
  {
    console.log("go back button")
    this.router.navigateByUrl('/login');
  }

  goToCashWithdrawal(otpForm) {
    // console.log(loginForm.value.otp);
    console.log(otpForm.customerPhonenum);
    otpForm.customerPhonenum = localStorage.getItem('PhoneNumLogin');
    console.log(otpForm.customerPhonenum);
    this.api.custpomerDetails(otpForm.customerPhonenum).subscribe((resp) => {
      console.log('backend resp', resp);
      if (resp != null) {
        localStorage.setItem('firstName',resp.firstName);
        sessionStorage.setItem('customer_id', resp.customerId);
        // localStorage.setItem('customer_details', resp);
        localStorage.setItem('customer_details', JSON.stringify(resp));
        this.router.navigate(['tabs']);
      }

    });
    // this.router.navigate(['tabs']);
  }
  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Please enter the valid OTP Number',
      duration: 5000
    });
    toast.present();
  }
 async openToast1(errorMessage) {
  const toast = await this.toastCtrl.create({
    message: `${errorMessage}` ,//'OTP has been sent again',
    duration: 5000
  });
  toast.present();
 }
} 
