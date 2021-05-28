import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'


@Component({
  selector: 'app-forex-transaction',
  templateUrl: './forex-transaction.page.html',
  styleUrls: ['./forex-transaction.page.scss'],
  
  
})
export class ForexTransactionPage implements OnInit {
  flag = true;
  users=['789045667','8789977889'];
  negotiated=['0.98','78.90'];
  forexForm: FormGroup;
  isShow : boolean = true;
  currencyList = [
    'BG',
    'BN'
    
  ]
  selectedCountryCode = 'us';
  countryCodes = ['us', 'lu', 'de', 'bs', 'br', 'pt'];

  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.forexForm = this.fb.group({
      accountNumber:['', [Validators.required]],
      accountBalance:['$12,09,89', [Validators.required]],
      transactionType:['', [Validators.required]],
      transactionCurrency:['', [Validators.required]],
      fxAmount:['', [Validators.required]],
      negotiatedRate:['', [Validators.required]],
      exchangeRate:['$12,09,89', [Validators.required]],
      trasactionBranchFlag:['', [Validators.required]],
      charges:['', [Validators.required]],
      remark:['', [Validators.required]],

    })
     console.log(this.forexForm.value);

  }
  next() {
    this.flag = false;
  }
  previous()
  {
    this.flag=true;
  }
  save(fb)
  {
   console.log(fb)
  }
}
