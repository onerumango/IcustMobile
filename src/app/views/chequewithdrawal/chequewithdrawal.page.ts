import { getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {format} from "date-fns" 
import * as moment from 'moment';
import { BranchComponent } from 'src/app/components/branch/branch.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from "src/app/services/data.service";


@Component({
  selector: 'app-chequewithdrawal',
  templateUrl: './chequewithdrawal.page.html',
  styleUrls: ['./chequewithdrawal.page.scss'],
})
export class ChequewithdrawalPage implements OnInit {
  title : any = 'Cheque Withdrawal';
   
    slideOneForm: FormGroup;
  customerId: string;
  public currentBalance: any;
  phoneNumber: string;
  curr: string;
  currencyValues: any;
  currencyData: any;
  currencies: any;
    constructor(private router:Router,
      private fb: FormBuilder,
      private api: ApiService,
      private modalController:ModalController,
      private shareDataService:DataService) {}
  productCode = 'CQW';
  tokenOrigin = 'Mobile';
    

    transactionAmount="10,000";
    accountBranch="Loita street";
    flag:boolean=true;
    currencyValue:string;
    cashWithdrawResponse: any;
    submitted: boolean=true;
    users:any[];
    accountNum: string;
    transDate: string
    transTime: string;
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
        this.savingAccountFun(resp);
       })
      console.log("customer_id",this.customerId)
      this.slideOneForm = this.fb.group({
        transactionId:['', [Validators.required]],
        customerId:['', [Validators.required]],
        chequeDepositId:['', [Validators.required]],
        productCode:['CQW',[Validators.required]],
        tokenOrigin : ['Mobile',[Validators.required]],
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
        remarks:['', [Validators.required]]
      })
       console.log(this.slideOneForm.value);
       this.getCountrynameValues();
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
        }
      })
    }
    numberOnlyValidation(event: any) {
      const pattern = /[0-9.,]/;
      let inputChar = String.fromCharCode(event.charCode);
  
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
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
  
    savingAccountFun(filteredResponseSavingAccount)
    {
  
   console.log(filteredResponseSavingAccount);
   this.users = filteredResponseSavingAccount.custAccount.map(a => a.accountId);
   const defaultId = this.users ? this.users[0] : null;
   this.slideOneForm.controls.accountNumber.setValue(defaultId);
   this.curr = getCurrencySymbol(filteredResponseSavingAccount.custAccount[0].accountCurrency, "narrow");
   this.currentBalance = this.users[0].amount;

   this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
   this.slideOneForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);
   }
    changeSelectedCountryCode(value: string): void {
     // this.selectedCountryCode = value;
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
        index: 'CQW'
      });
      this.router.navigate(['token-generation']);
    }
    save(form)
    {
  
      console.log(form)
      form.transactionDate.toString();
       
  
      var date = new Date(form.transactionDate).toLocaleDateString("en-us")
      console.log(date) //4/
      form.transactionDate=date;
      
      // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
      this.currencyData =  this.currencies.find(x => x.countryCode == form.transactionCurrency);
      form.transactionCurrency = this.currencyData.currencyCode;
      form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');

      form.customerId=this.customerId;
      form.productCode = this.productCode;
      form.tokenOrigin = this.tokenOrigin;
     
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
      console.log(form);
      this.api.cashDepositSave(form).subscribe((resp) => {
        console.log('backend resp', resp);
      let transactionId = resp.transactionId;
      console.log("transactionId::",transactionId)
      this.shareDataService.shareTransactionId(transactionId);
      });
      if(this.cashWithdrawResponse!==null){
        this.router.navigate(['token-generation']);
      }
     
      
    }
  
    accountEvent(event){
      console.log("event",event.detail.value)
      this.api.accountBalance(event.detail.value).subscribe((accbal) => {
        console.log('backend accbal', accbal);
    this.valueSet(accbal.currentBalance);
    this.currentBalance = accbal.amount;
    // console.log(this.slideOneForm.controls)
    this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
    // this.slideOneForm.controls.transactionAmount.patchValue(accbal.amount);
    this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
    this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
    for(let i in this.currencies) {
      this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
      this.slideOneForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
  }
        // this.users=dropdown;

      
      });
     
    }
    valueSet(currentBalance){
      this.currentBalance=currentBalance;

    }
    async presentModal() {
      const modal = await this.modalController.create({
        component: BranchComponent,
        id:"branchModal",
        componentProps: {
        }
      });
  
      modal.onDidDismiss().then((modelData) => {
        if (modelData !== null) {
          let branch = modelData.data;
          console.log('Modal Data for branch: ', modelData.data);
          this.slideOneForm.patchValue({
            transactionBranch:modelData.data['data'].address
          });
        }
      });
  
      return await modal.present();
    }
   
}
interface CountryType {
  code: string;
   countryName: string;
  accountCurrency: string;
  currencyName: string;
 
}
