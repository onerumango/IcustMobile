import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      currentPassword:['', [Validators.required]],
      newPassword:['', [Validators.required]],
      newPasswordConfirmation:['', [Validators.required]],
    
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
 
}
previous()
{
  this.router.navigate(['/tabs/profile']);
}
}
