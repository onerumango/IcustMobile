import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CustomValidatorsService } from 'src/app/services/custom-validators.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  currShowPassword:boolean=false;
  newShowPassword:boolean=false;
  reEnterShowPassword:boolean=false;
  firstTimeLogin:any='N';
  customerPhonenum:any;
  constructor(private fb: FormBuilder,private router:Router, private api: ApiService, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.firstTimeLogin=localStorage.getItem('firstTimeLogin');
    if( this.firstTimeLogin == null ||  this.firstTimeLogin == undefined ||  this.firstTimeLogin==''){
      this.firstTimeLogin='N';
    }
    this.customerPhonenum=localStorage.getItem('customerPhonenum');
    console.log("<===> ",this.firstTimeLogin === 'Y'? 'YES': 'NO');
    this.changePasswordForm = this.fb.group({
      currentPassword:['', this.firstTimeLogin === 'Y'? []: [Validators.required]],
      newPassword:['',         Validators.compose([
        // 1. Password Field is Required
        Validators.required,
        // 2. check whether the entered password has a number
        CustomValidatorsService.patternValidator(/\d/, { hasNumber: true }),

        // 3. check whether the entered password has upper case letter
        CustomValidatorsService.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // 4. check whether the entered password has a lower-case letter
        CustomValidatorsService.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // 5. check whether the entered password has a special character
        CustomValidatorsService.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        // 6. Has a minimum length of 8 characters
        Validators.minLength(8)

      ])],
      newPasswordConfirmation:['', Validators.compose([Validators.required])],
    
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidatorsService.passwordMatchValidator
    })
     console.log(this.changePasswordForm.value);
  }
  public onPasswordToggle(showType): void {
    if(showType === 'current'){
      this.currShowPassword = !this.currShowPassword;
    }
    if(showType === 'new'){
      this.newShowPassword = !this.newShowPassword;
    }
    if(showType === 'reenter'){
      this.reEnterShowPassword = !this.reEnterShowPassword;
    }
    
  }
save(){
  console.log(this.changePasswordForm.value);
 var obj={
  "phoneNumber":this.customerPhonenum,
  "custPassword":this.changePasswordForm.value.newPasswordConfirmation
}
this.api.updateCustomerPassword(obj).subscribe(
  data=>{
    if(data.hasOwnProperty("content") ){
      if(data.content.toString().includes('No record exists for given phone number')){
        this.openToast('No record exists for given phone number');
      }
    }else{
      localStorage.setItem('firstTimeLogin','N')
      if(this.firstTimeLogin == 'Y'){
        this.openToast('Created password successfully');
        this.router.navigateByUrl('/otp');
      }else{
        this.openToast('Updated password successfully');
      }
     
    }
   
  },error=>{

  }
)
}
async openToast(message) {
  const toast = await this.toastCtrl.create({
    message: `${message}`,
    duration: 5000
  });
  toast.present();
}
previous()
{
  if(this.firstTimeLogin === 'Y'){
 this.router.navigateByUrl('/login');
  }else{
    this.router.navigate(['/tabs/profile']);
  }
}
}
