import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-utility-payment',
  templateUrl: './utility-payment.page.html',
  styleUrls: ['./utility-payment.page.scss'],
})
export class UtilityPaymentPage implements OnInit {
  utilityForm: FormGroup;
  constructor(private fb: FormBuilder,private router:Router) { }
  billNames=['1090000 88987 87123','1090000 88987 87122','1090000 88987 87128']
  account=['xxxxxxxx101','xxxxxx201']
  ngOnInit() {
    this.utilityForm = this.fb.group({
      billerName:['', [Validators.required]],
      accountBalance:['$12,09,89', [Validators.required]],
      amount:['', [Validators.required]],
      payFromAccount:['', [Validators.required]],
      billDate:['', [Validators.required]],
    
      billNumber:['', [Validators.required]],
      remark:['', [Validators.required]],

    })
     console.log(this.utilityForm.value);
   
  }
next()
{
  console.log(this.utilityForm.value);
  this.router.navigate(['forex-transaction']);
}
}
