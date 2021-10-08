=import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from "date-fns"
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, ToastController } from '@ionic/angular';
import { getCurrencySymbol } from '@angular/common';
import { DataService } from "src/app/services/data.service";
import { BranchComponent } from 'src/app/components/branch/branch.component';

@Component({
  selector: 'app-cashdeposit',
  templateUrl: './cashdeposit.page.html',
  styleUrls: ['./cashdeposit.page.scss'],
})
export class CashdepositPage implements OnInit {
  title: any = 'Cash Deposit';
  productCode = "CHD";
  tokenOrigin = "Mobile";
  depositForm: FormGroup;
  currentBalance: any;
  customerId: string;
  submitted: boolean = true;
  submitted1: boolean=true;
  phoneNumber: string;
  curr: string;
  currencyValues: any;
  currencyData: any;
  currencies: any;
  customerDetails: any;
  constructor(
    public toastCtrl: ToastController, 
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService, 
    private toastController: ToastController,
    private modalController:ModalController,
    private shareDataService:DataService) { }
  transactionAmount = "10,000";
  accountBranch = "Loita street";
  flag: boolean = true;
  currencyValue: string;
  minDate = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
  users: any[] = [];
  accountNum: string;
  transDate: string
  transTime: string;
  toast: HTMLIonToastElement;
  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    this.customerId = sessionStorage.getItem('customer_id');
    console.log("customer_id", this.customerId)
    this.customerId = sessionStorage.getItem('customer_id');
    // this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //   console.log('backend dropdown', dropdown);
    //   this.users = dropdown;

    //   if (dropdown == null) {
    //     this.openToast();
    //   }

    // });
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in home', resp);
      this.customerDetails = resp;
      this.savingAccountFun(resp);
     })
    this.depositForm = this.fb.group({
      transactionId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      productCode:['CHD',[Validators.required]],
      tokenOrigin : ['Mobile',[Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountBalance: ['', [Validators.required]],
      transactionCurrency: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[1-9]\d*$/)]],
      branchFlag: [true, [Validators.required]],
      accountBranch: ['', [Validators.required]],
      transactionDate: ['', [Validators.required]],
      transactionBranch: ['', [Validators.required]],
	@@ -94,58 +104,69 @@ export class CashdepositPage implements OnInit {
      recordStatus: ['', [Validators.required]],
      authStatus: ['', [Validators.required]],
      version: ['', [Validators.required]]
    })
    console.log(this.depositForm.value);


    //  let disableBtn = false;
    // this.depositForm.valueChanges 
    //             .subscribe((changedObj: any) => {
    //                 //  this.disableBtn = this.depositForm.valid;
    //                 console.log('transactionAmount :: ',this.depositForm.controls.transactionAmount)
    //             });
    //  console.log(this.countries);
    this.getCountrynameValues();

    this.depositForm.get('branchFlag').valueChanges.subscribe(val => {
      console.log("branch flag?", val);
      if (val == false) {
        this.depositForm.get('transactionBranch').patchValue("");
      }else{
        this.depositForm.get('transactionBranch').patchValue(this.customerDetails.custAccount[0].accountBranch);
      }
    })

  }

  get f() { return this.depositForm.controls; }

  getCountrynameValues() {

    this.api.getCurrencyValues().subscribe((allCurrencyValues : any)=> {
      this.currencies = allCurrencyValues;
      });
    }



  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  isShow: boolean = true;

  selectedCountryCode = '';

  method() {

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: BranchComponent,
	@@ -158,153 +179,197 @@ export class CashdepositPage implements OnInit {
      if (modelData !== null) {
        let branch = modelData.data;
        console.log('Modal Data for branch: ', modelData.data);
        this.depositForm.get('transactionBranch').patchValue(modelData.data['data'].branchName);
      }
    });

    return await modal.present();
  }


  selectCurrencyCode(currency) {
    console.log(currency);
    this.currencyData =  this.currencies.find(x => x.countryCode == currency);
    this.selectedCountryCode = this.currencyData.countryCode.toLowerCase();
  }


  changeSelectedCountryCode(value: string): void {
    // this.selectedCountryCode = value;
  }

  goToHomepage() {
    this.depositForm.reset();
    this.router.navigate(['/tabs/home']);
  }
  goToNextPage(fb) {
    this.flag = false;

  }
  goToPreviousPage() {
    this.flag = true;
  }
  goToNextScreen(form) {
    this.api.setIndex({
      index: 'CHD'
    });
    form.transactionDate.toString();


    var date = new Date(form.transactionDate).toLocaleDateString("en-us")
    console.log(date) //4/
    form.transactionDate = date;

    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
    this.currencyData =  this.currencies.find(x => x.countryCode == form.transactionCurrency);
    form.transactionCurrency = this.currencyData.currencyCode;
    form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
    form.customerId = this.customerId;
    form.productCode = this.productCode;
    form.tokenOrigin = this.tokenOrigin;
    console.log(form);
    this.accountNum = form.accountNumber;
    this.transactionAmount = form.transactionAmount;
    console.log(this.transactionAmount);
    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();

    localStorage.setItem("AccountNumber", this.accountNum);
    localStorage.setItem("TransactionDate", this.transDate);
    localStorage.setItem("TransactionTime", form.transactionTime);
    localStorage.setItem("TransactionAmount", this.transactionAmount);
    localStorage.setItem("TransactionBranch", form.transactionBranch);
    console.log("form::",form);

    this.api.cashDepositSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
    let transactionId = resp.transactionId;
    console.log("transactionId::",transactionId)
    this.shareDataService.shareTransactionId(transactionId);
    this.depositForm.reset();
    this.router.navigate(['token-generation']);
    });

  }

  accountEvent(event) {
    console.log("event", event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      console.log('backend accbal', accbal.currentBalance);
      this.valueSet(accbal.currentBalance);
      console.log('backend accbal', accbal.amount);
      this.currentBalance = accbal.amount;
      console.log(this.depositForm.controls)
      // this.depositForm.controls.transactionAmount.patchValue(accbal.amount);
      this.depositForm.controls.accountBranch.patchValue(accbal.accountBranch);
      this.depositForm.controls.transactionCurrency.patchValue(accbal.countryCode);
      this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
      // this.users=dropdown;
      for(let i in this.currencies) {
        this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
        this.depositForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
    }
    });

  }
  savingAccountFun(filteredResponseSavingAccount)
  {

 console.log(filteredResponseSavingAccount);
 this.users = filteredResponseSavingAccount.custAccount;


 this.curr = getCurrencySymbol(filteredResponseSavingAccount.custAccount[0].accountCurrency, "narrow");
 this.currentBalance = this.users[0].amount;

 this.depositForm.get('accountNumber').patchValue(this.users[0].accountId);
 this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
 this.depositForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);

 }
  validateDisablebutton(button) {

    this.depositForm.valueChanges.subscribe(v => {
      // console.log("v:: ", v);
      if (button === 'disable1') {
        if (v.accountBranch != '' && v.accountNumber != '' && v.transactionAmount != ''
         && v.transactionCurrency != '' && v.transactionAmount != 0) {
          this.submitted = false;
        } else {
          this.submitted = true;
        }
        console.log(this.submitted);
      }

      if (button === 'disable2') {
        if (v.transactionBranch != '' && v.transactionDate != '' && v.transactionTime != '' && v.accountNo != '') {
          this.submitted1 = false;
        } else {
          this.submitted1 = true;
        }
      }

    });
  }
  valueSet(currentBalance) {
    this.currentBalance = currentBalance;

  }
  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Account Number is not existing for this customer Id',
      duration: 5000
    });
    toast.present();
  }
}
interface CountryType {
  code: string;
  countryName: string;
  accountCurrency: string;
  currencyName: string;

}
