import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  image: String;
  loginForm: FormGroup;
  constructor(private router:Router,private fb: FormBuilder) {
    
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      phoneNo:['', [Validators.required]],
      otp:['', [Validators.required]]
     
    })
    console.log(this.loginForm.value.otp);
    console.log(this.loginForm.value);
  }

  goToCashWithdrawal(){
    this.router.navigate(['tabs']);
    console.log(this.loginForm.value.otp);
    console.log(this.loginForm.value);

  }


}
