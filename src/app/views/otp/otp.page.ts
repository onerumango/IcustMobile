import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
export class verifyotpModel {
  sourceKey: any;
  sourceValue: any;
  otp: any;
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
  otpResponse: any
  constructor(private router: Router, private fb: FormBuilder, private api: ApiService) {

  }

  ngOnInit() {

    this.otpForm = this.fb.group({
      // phoneNo:['', [Validators.required]],
      otp: ['', [Validators.required]]

    })
    localStorage.getItem('PhoneNumLogin');
    console.log(localStorage.getItem('PhoneNumLogin'));
  }

  validateOtp(otpValue) {
    console.log("OTP validaion", otpValue);

    console.log("Phonenumber for OTP", otpValue, otpValue.otp)
    this.verifyOtpModel.sourceKey = 'mobile';
    this.verifyOtpModel.sourceValue = '9059029994';
    this.verifyOtpModel.otp = otpValue.otp;
    this.verifyOtpModel.type = '';
    console.log("model", this.verifyOtpModel);
    this.api.verifyOtp(this.verifyOtpModel).subscribe(otpResp => {
      console.log("Response Success", otpResp)
      this.otpResponse = otpResp
    })
    if (this.otpResponse !== null) {
      // this.router.navigateByUrl('/others/services');
      this.goToCashWithdrawal(this.otpForm);
    }
    else {
      this.router.navigateByUrl('/sessions/login');
    }
  }

  goToCashWithdrawal(otpForm) {
    // console.log(loginForm.value.otp);
    console.log(otpForm.customerPhonenum);
    otpForm.customerPhonenum = localStorage.getItem('PhoneNumLogin');
    console.log(otpForm.customerPhonenum);
    this.api.custpomerDetails(otpForm.customerPhonenum).subscribe((resp) => {
      console.log('backend resp', resp);
      if (resp !== null) {
        sessionStorage.setItem('customer_id', resp.customerId);
        // localStorage.setItem('customer_details', resp);
        localStorage.setItem('customer_details', JSON.stringify(resp));
        this.router.navigate(['tabs']);
      }

    });
    // this.router.navigate(['tabs']);
  }


}
