import { getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {format} from "date-fns" 
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { BranchPage } from '../cashwithdrawal/branch/branch.page';
import { DataService } from "src/app/services/data.service";

@Component({
  selector: 'app-chequedeposit',
  templateUrl: './chequedeposit.page.html',
  styleUrls: ['./chequedeposit.page.scss'],
})
export class ChequedepositPage implements OnInit {
  title : any = 'Cheque Deposit';
  submitted: boolean = true;
  submitted1: boolean=true;
  slideOneForm: FormGroup;
  currentBalance: any;
  curr: any;
  currencyValues: any;
  currencies: any;
  currencyData: any;
  constructor(private router:Router,private fb: FormBuilder,private api: ApiService ,
    private modalController:ModalController,
    private shareDataService:DataService,) {}
  transactionAmount="10,000";
  accountBranch="Loita street";
  flag:boolean=true;
  currencyValue:string;
  accountNum: string;
  transDate: string
  transTime: string;
  cashWithdrawResponse: any;
  phoneNumber: string;
  users:any[];
  customerId:any;
  minDate = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    this.customerId = sessionStorage.getItem('customer_id');
    // this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //   console.log('backend dropdown', dropdown);
    //   this.users=dropdown;
    // });
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in home', resp);
      this.savingAccountFun(resp.custAccount);
     })
    this.slideOneForm = this.fb.group({
      transactionId:['', [Validators.required]],
      customerId:['', [Validators.required]],
      chequeDepositId:['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountBalance: ['', [Validators.required]],
      transactionCurrency: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required]],
      branchFlag: ['', [Validators.required]],
      accountBranch: ['', [Validators.required]],
      transactionDate: ['', [Validators.required]],
      transactionBranch: ['', [Validators.required]],
      transactionTime: ['', [Validators.required]],
      exchangeRate: ['', [Validators.required]],
      accountAmount: ['', [Validators.required]],
      totalChargeAmount: ['', [Validators.required]],
      narrative: ['', [Validators.required]],
      denomination: [null, [Validators.required]],
      totalAmount: ['', [Validators.required]],
      createdBy: ['', [Validators.required]],
      createdTime: ['', [Validators.required]],
      modifiedBy: ['', [Validators.required]],
      modifiedTime: ['', [Validators.required]],
      recordStatus: ['', [Validators.required]],
      authStatus: ['', [Validators.required]],
      version: ['', [Validators.required]],
        remarks:['', [Validators.required]],
        productCode: ['', [Validators.required]],
      tokenOrigin: ['', [Validators.required]]
    })
     console.log(this.slideOneForm.value);
     this.getCountrynameValues();
  }
  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  validateDisablebutton(button) {

    this.slideOneForm.valueChanges.subscribe(v => {
      // console.log("v:: ", v);
      if (button === 'disable1') {
        if (v.accountBranch != '' && v.accountNumber != '' && v.transactionAmount != ''
         && v.transactionCurrency != '' && v.transactionAmount != 0) {
          this.submitted = false;
        } else {
          this.submitted = true;
        }
        // console.log(this.submitted);
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


  getCountrynameValues() {

    this.api.getCurrencyValues().subscribe((allCurrencyValues : any)=> {
      this.currencies = allCurrencyValues;
      });
    }
  
  isShow : boolean = true;
 
  selectedCountryCode = '';
 

  selectCurrencyCode(currency) {
    console.log(currency);
    this.currencyData =  this.currencies.find(x => x.countryCode == currency);
    this.selectedCountryCode = this.currencyData.countryCode.toLowerCase();
  }


  changeSelectedCountryCode(value: string): void {
   // this.selectedCountryCode = value;
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: BranchPage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        let branch = modelData.data;
        console.log('Modal Data for branch: ', modelData.data);
        this.slideOneForm.patchValue({
          transactionBranch:modelData.data['data'].title + ', ' + modelData.data['data'].address
        });
      }
    });

    return await modal.present();
  }


  goToHomepage(){
    this.router.navigate(['/tabs/home']);
  }
  goToNextPage(fb){
    this.flag=false;
    
  }
  goToPreviousPage(){
    this.flag=true;
  }
  goToNextScreen(){
    this.api.setIndex({
      index: 'CQD'
    });
    this.router.navigate(['token-generation']);
  }
  savingAccountFun(filteredResponseSavingAccount)
  {

 console.log(filteredResponseSavingAccount);
 this.users = filteredResponseSavingAccount.map(a => a.accountId);
 const defaultId = this.users ? this.users[0] : null;
 this.slideOneForm.controls.accountNumber.setValue(defaultId);
 this.slideOneForm.controls.transactionCurrency.setValue(filteredResponseSavingAccount[0].accountCurrency);
 this.curr = getCurrencySymbol(filteredResponseSavingAccount[0].accountCurrency, "narrow");
 this.currentBalance = this.users[0].amount;
 }
  save(form)
  {

    console.log(form)
    form.transactionDate.toString();
     

    var date = new Date(form.transactionDate).toLocaleDateString("en-us")
    console.log(date) //4/
    form.transactionDate=date;
    
    
    this.currencyData =  this.currencies.find(x => x.countryCode == form.transactionCurrency);
    form.transactionCurrency = this.currencyData.currencyCode;
  
    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm"); 
    form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
    form.customerId=this.customerId;
    form.productCode = 'CQD';
    form.tokenOrigin = 'Mobile';
    console.log(form);
    this.accountNum=form.accountNumber;
    this.transactionAmount= form.transactionAmount;
    console.log(this.transactionAmount);
    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();
  
    localStorage.setItem("AccountNumber",this.accountNum);
    localStorage.setItem("TransactionDate",this.transDate);
    localStorage.setItem("TransactionTime",form.transactionTime);
    localStorage.setItem("TransactionAmount",this.transactionAmount);
    localStorage.setItem("TransactionBranch",form.transactionBranch);
    this.api.cashDepositSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
      if(resp!=null){
        let transactionId = resp.transactionId;
        console.log("transactionId::",transactionId)
        this.shareDataService.shareTransactionId(transactionId);
      }
    });
    if(this.cashWithdrawResponse!==null){
      this.router.navigate(['token-generation']);
    }
    
  }
  accountEvent(event){
    console.log("event",event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      console.log('backend accbal', accbal.currentBalance);
  this.valueSet(accbal.currentBalance);
  this.currentBalance = accbal.amount;
  this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
  // this.slideOneForm.controls.transactionAmount.patchValue(accbal.amount);
  this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
  this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
  
  for(let i in this.currencies) {
    // console.log(this.selectedCountryCode);
    if(accbal.countryCode === this.currencies[i].countryCode) {
      this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
      // console.log(this.selectedCountryCode);
    }
  }
      // this.users=dropdown;
    
    });
   
  }
  valueSet(currentBalance){
    this.currentBalance=currentBalance;

  }

}
interface CountryType {
  code: string;
   countryName: string;
  accountCurrency: string;
  currencyName: string;
 
}