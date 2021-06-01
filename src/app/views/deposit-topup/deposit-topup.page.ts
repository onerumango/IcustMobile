import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit-topup',
  templateUrl: './deposit-topup.page.html',
  styleUrls: ['./deposit-topup.page.scss'],
})
export class DepositTopupPage implements OnInit {

  users=['789045667','8789977889'];
  a='678889';
  b='hjhjhj';
  c='678788';
  loanForm: FormGroup;
  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit() {
    this.loanForm = this.fb.group({
      depositAccount:['', [Validators.required]],
      accountBalance:[' $12,09,89', [Validators.required]],
      topUpAmount:['', [Validators.required]],
      payFromAccount:['', [Validators.required]],
      revisedPrincipalAmount:[' $12,09,89', [Validators.required]],
      revisedMaturityAmount:[' $12,09,89', [Validators.required]],
      // repaymentAmount:['', [Validators.required]]
    })
     console.log(this.loanForm.value);
  }
  save(fb)
  {
    console.log("inside loan")
     console.log(fb);
     this.router.navigate(['token-generation']);
  }
  }


