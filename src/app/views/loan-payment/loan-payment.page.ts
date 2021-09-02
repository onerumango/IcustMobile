import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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
  filteredResponseSavingAccount:any[];
  savingAccount:any[];
  filteredResponseLoanAccount:any[];
  currentBalance: any;
  constructor(private fb: FormBuilder, private api: ApiService,private router:Router) { }

  ngOnInit() {
    this.api.getLoanInfo('7483316064').subscribe((resp) => {
      console.log('backend dropdown', resp.custAccount);
       this.filteredResponseSavingAccount = resp.custAccount.filter(res => res.accountType != "loan");
       console.log("filteredResponseSave",this.filteredResponseSavingAccount)
       this.savingAccountFun(this.filteredResponseSavingAccount)
       this.filteredResponseLoanAccount = resp.custAccount.filter(res => res.accountType == "loan");
       console.log("filteredResponseSave",this.filteredResponseLoanAccount)
      // this.users=resp;
    });
    this.loanForm = this.fb.group({
      loanAccount:['', [Validators.required]],
      accountBalance:['', [Validators.required]],
      currentArrears:['', [Validators.required]],
      currentDue:['', [Validators.required]],
      principalOutstanding:['', [Validators.required]],
      payFromAccount:['', [Validators.required]],
      repaymentAmount:['', [Validators.required]]
    })
     console.log(this.loanForm.value);
  }
  savingAccountFun(filteredResponseSavingAccount)
   {

  console.log(filteredResponseSavingAccount)
  this.savingAccount = filteredResponseSavingAccount.map(a => a.accountId);
  console.log(this.savingAccount);

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
  accountEvent(event){
    console.log("event",event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      console.log('backend accbal', accbal.currentBalance);
  this.valueSet(accbal.currentBalance);
      // this.users=dropdown;
    
    });
   
  }
  valueSet(currentBalance){
    this.currentBalance=currentBalance;

  }
  }


