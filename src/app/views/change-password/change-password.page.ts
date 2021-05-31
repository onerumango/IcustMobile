import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      currentPassword:['', [Validators.required]],
      newPassword:['', [Validators.required]],
      newPasswordConfirmation:['', [Validators.required]],
    
    })
     console.log(this.changePasswordForm.value);
  }
save(){
  console.log(this.changePasswordForm.value);
}
}
