import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
export class otpModel {
  source_key:any;
  source_value:any;
  source:any;
}

export class verifyotpModel {
  sourceKey:any;
  sourceValue:any;
  otp:any;
  type:any;
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
  constructor(private router:Router,private fb: FormBuilder,private api: ApiService) {
    
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      phoneNo:['', [Validators.required]],
      otp:['', [Validators.required]]
     
    })
    console.log(this.loginForm.value.otp);
    console.log(this.loginForm.value);
  }


  getOtp(phone) {
    console.log("Phonenumber for OTP", phone.phoneNo)
    this.customerPhonenum=phone.phoneNo;
    localStorage.setItem("PhoneNumLogin",this.customerPhonenum);
    this.oTpModel.source='customer';
    this.oTpModel.source_key='mobile';
    this.oTpModel.source_value=phone.phoneNo;
    console.log("model",this.oTpModel);
    this.api.getOtp(this.oTpModel).subscribe(otpResp=>{
      console.log("Response Success", otpResp)
  
    })
     
    this.router.navigateByUrl('/otp');
     
  }
  
  validateOtp(otpValue){
    console.log("OTP validaion",otpValue);
   
    console.log("Phonenumber for OTP", otpValue, this.loginForm.value.otp)
    this.verifyOtpModel.sourceKey='mobile';
    this.verifyOtpModel.sourceValue='9059029994';
    this.verifyOtpModel.otp=otpValue.otpNumber;
    this.verifyOtpModel.type='';
    console.log("model",this.verifyOtpModel);
    this.api.verifyOtp(this.verifyOtpModel).subscribe(otpResp=>{
      console.log("Response Success", otpResp) 
      this.otpResponse = otpResp  
  })
  if(this.otpResponse !== null){
    // this.router.navigateByUrl('/others/services');
    // this.goToCashWithdrawal(this.loginForm);
  }
  else
  {
    this.router.navigateByUrl('/sessions/login');
  }
  }

  goToCashWithdrawal(loginForm){
   
    // console.log(loginForm.value.otp);
    console.log(loginForm.phoneNo);
    this.api.custpomerDetails(loginForm.phoneNo).subscribe((resp) => {
      console.log('backend resp', resp);
      if(resp!=null)
      {
        sessionStorage.setItem('customer_id', resp.customerId);
        this.router.navigate(['tabs']);
      }
      
    });
    // this.router.navigate(['tabs']);
  }


}
