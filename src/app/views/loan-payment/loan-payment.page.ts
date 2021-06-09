import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-payment',
  templateUrl: './loan-payment.page.html',
  styleUrls: ['./loan-payment.page.scss'],
})
export class LoanPaymentPage implements OnInit {
  users=['789045667','8789977889'];
  a='678889';
  b='hjhjhj';
  c='678788';
  loanForm: FormGroup;
  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.loanForm = this.fb.group({
      loanAccount:['', [Validators.required]],
      accountBalance:[' $12,09,89', [Validators.required]],
      currentArrears:[' $12,09,89', [Validators.required]],
      currentDue:[' $12,09,89', [Validators.required]],
      principalOutstanding:[' $12,09,89', [Validators.required]],
      payFromAccount:['', [Validators.required]],
      repaymentAmount:['', [Validators.required]]
    })
     console.log(this.loanForm.value);
  }
  save(fb)
  {
    console.log("inside loan")
     console.log(fb);
     this.router.navigate(['token-generation']);
    //  this.router.navigate(['deposit-topup']);
  }
  previous1()
  {
    this.router.navigate(['tabs']);
  }
  }


