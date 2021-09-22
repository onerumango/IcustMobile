import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
export class otpModel {
  source_key: any;
  source_value: any;
  source: any;
}

export class verifyotpModel {
  sourceKey: any;
  sourceValue: any;
  otp: any;
  type: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  image: String;
  loginForm: FormGroup;
  otpValue: any = null;
  otpValid: boolean = false;
  oTpModel = new otpModel();
  verifyOtpModel = new verifyotpModel();
  otpResponse: any;
  customerPhonenum: any;
  userResp: boolean = false;
  constructor(private router: Router, private cdk: ChangeDetectorRef,
    private fb: FormBuilder, private api: ApiService, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      phoneNo: ['', [Validators.required]],
      otp: ['', [Validators.required]]

    })
    console.log(this.loginForm.value.otp);
    console.log('login :: ', this.loginForm.value);
  }

  _keyPress(event: any) {
    // console.log("key",event);
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();

    }
}

  getOtp(phone) {
    console.log("Phonenumber for OTP", phone.phoneNo)
    this.customerPhonenum = phone.phoneNo;
    if(this.customerPhonenum == '')
    this.openToast();
    localStorage.setItem("PhoneNumLogin", this.customerPhonenum);
    this.oTpModel.source = 'customer';
    this.oTpModel.source_key = 'mobile';
    this.oTpModel.source_value = phone.phoneNo;
    console.log("model", this.oTpModel);
    if(this.oTpModel.source_value != ''){
      this.api.getOtp(this.oTpModel).subscribe(otpResp => {
        console.log("Response Success", otpResp)
        this.otpResponse = otpResp
        /* Added validation for un-registered mobile nummber is entered */
        if (this.otpResponse.otpVal.userId === "New Customer" || (this.otpResponse.otpVal.userId ==='' && this.otpResponse.otpVal.userId ===null)) {
          this.cdk.detectChanges();
          this.userResp = true;
          this.openToast();
        } else {
          // this.otpResponse.otpVal.userId !='' && this.otpResponse.otpVal.userId!=null && 
          console.log('in else')
          this.router.navigateByUrl('/otp');
        }
      })

    }
   

    // this.router.navigateByUrl('/otp');

  }

  validateOtp(otpValue) {
    console.log("OTP validaion", otpValue);

    console.log("Phonenumber for OTP", otpValue, this.loginForm.value.otp)
    this.verifyOtpModel.sourceKey = 'mobile';
    this.verifyOtpModel.sourceValue = '9059029994';
    this.verifyOtpModel.otp = otpValue.otpNumber;
    this.verifyOtpModel.type = '';
    console.log("model", this.verifyOtpModel);
    this.api.verifyOtp(this.verifyOtpModel).subscribe(otpResp => {
      console.log("Response Success", otpResp)
      this.otpResponse = otpResp
    })
    if (this.otpResponse !== null) {
      // this.router.navigateByUrl('/others/services');
      // this.goToCashWithdrawal(this.loginForm);
    }
    else {
      this.router.navigateByUrl('/sessions/login');
    }
  }

  goToCashWithdrawal(loginForm) {

    // console.log(loginForm.value.otp);
    console.log(loginForm.phoneNo);
    this.api.custpomerDetails(loginForm.phoneNo).subscribe((resp) => {       //where u need to add?
      console.log('backend resp', resp);
      if (resp != null) {
        sessionStorage.setItem('customer_id', resp.customerId);
        this.router.navigate(['tabs']);
      }

    });
    // this.router.navigate(['tabs']);
  }
  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Please enter the registered Phone Number',
      duration: 5000
    });
    toast.present();
  }


}
