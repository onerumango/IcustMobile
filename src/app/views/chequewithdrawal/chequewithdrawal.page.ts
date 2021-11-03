import { getCurrencySymbol } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { format } from "date-fns"
import * as moment from 'moment';
import { BranchComponent } from 'src/app/components/branch/branch.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from "src/app/services/data.service";
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimeSlotsComponent } from 'src/app/components/time-slots/time-slots.component';



@Component({
  selector: 'app-chequewithdrawal',
  templateUrl: './chequewithdrawal.page.html',
  styleUrls: ['./chequewithdrawal.page.scss'],
})
export class ChequewithdrawalPage implements OnInit {
  title: any = 'Cheque Withdrawal';

  slideOneForm: FormGroup;
  customerId: string;
  public currentBalance: any;
  phoneNumber: string;
  curr: string;
  currencyValues: any;
  currencyData: any;
  currencies: any;
  customerDetails: any;
  chequeWithdrawal: any;
  transactionId: any;
  IntValue: number;
  nearestBrn: boolean;
  constructor(private router: Router,
    private fb: FormBuilder,
    private api: ApiService,public toastCtrl: ToastController,
    private modalController: ModalController,
    public datepipe: DatePipe,
    private shareDataService: DataService,private changeDef: ChangeDetectorRef) { }
  productCode = 'CQW';
  tokenOrigin = 'Mobile';
  // for transaction amount comma separator
  //transactionAmount="10,000";
  //transactionAmount:double;
  transactionAmount:any;
  transAmount: string;
  //transAmount:number;
  isedit:boolean=true;
  transAmt: any;
  
  accountBranch = "Loita street";
  flag: boolean = true;
  currencyValue: string;
  cashWithdrawResponse: any;
  submitted: boolean = true;
  users: any[];
  accountNum: string;
  transDate: string
  transTime: string;
  minDate = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();

  ngOnInit() {
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    this.customerId = sessionStorage.getItem('customer_id');
    // this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //   console.log('backend dropdown', dropdown);
    //   this.users=dropdown;
    // });
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in home', resp);
      this.customerDetails = resp;
      this.savingAccountFun(resp);
    })
    console.log("customer_id", this.customerId)
    this.slideOneForm = this.fb.group({
      transactionId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      chequeDepositId: ['', [Validators.required]],
      productCode: ['CQW', [Validators.required]],
      tokenOrigin: ['Mobile', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountBalance: ['', [Validators.required]],
      transactionCurrency: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required]],
      branchFlag: [true, [Validators.required]],
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
      remarks: ['', [Validators.required]]
    })
    console.log(this.slideOneForm.value);
    this.getCountrynameValues();

    this.slideOneForm.get('branchFlag').valueChanges.subscribe(val => {
      console.log("branch flag?", val);
      localStorage.setItem("BranchFlag", val);
      if (val == false) {
        this.slideOneForm.get('transactionBranch').patchValue("");
        this.nearestBrn=true;
      } else {
        this.slideOneForm.get('transactionBranch').patchValue(this.customerDetails.custAccount[0].accountBranch);
        this.nearestBrn=true;
      }
    })

  }

  get f() { return this.slideOneForm.controls; }

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
    this.transAmt= event.target.value;
    console.log(event.target.value);
  this.IntValue=Math.floor(this.slideOneForm.value.transactionAmount).toString().length;
  if(this.IntValue>3){

     let value:string;
     value=this.slideOneForm.value.transactionAmount;
   
     //let inputChar = String.fromCharCode(event.charCode);
    // debugger;
     this.transAmount = value;
    // debugger
     const pattern = value;
     let lastCharIsPoint = false;
   if (pattern.charAt(pattern.length - 1) === '.') {
     lastCharIsPoint = true;
   }
   const num = pattern.replace(/[^0-9.]/g, '');
   this.transAmt = Number(num);
   this.transAmount = this.transAmt.toLocaleString('en-US');
   if (lastCharIsPoint) {
     this.transAmount = this.transAmount.concat('.');
   }
   this.changeDef.detectChanges();
  
  
  
  }
  // console.log(this.transAmt);
  console.log(this.currentBalance);
  console.log(this.transAmt);
  this.transAmt=this.transAmt.replace(/,/g, '');
  console.log(this.transAmt);
  if(parseFloat(this.currentBalance) < parseFloat(this.transAmt)){
    console.log("Bigger");
    this.openToast1();
 
  }
    // this.slideOneForm.controls['transactionAmount'].setValidators();
    else{
      return;
    }
  }
  async openToast1() {
    const toast = await this.toastCtrl.create({
      message: 'Transaction Amount should not exceed than Account Balance',
      duration: 2000
    });
    toast.present();
  }
  getCountrynameValues() {

    this.api.getCurrencyValues().subscribe((allCurrencyValues: any) => {
      this.currencies = allCurrencyValues;
    });
  }



  isShow: boolean = true;

  selectedCountryCode = '';


  selectCurrencyCode(currency) {
    console.log(currency);
    this.currencyData = this.currencies.find(x => x.countryCode == currency);
    this.selectedCountryCode = this.currencyData.countryCode.toLowerCase();
  }

  savingAccountFun(filteredResponseSavingAccount) {

    console.log(filteredResponseSavingAccount);
    this.users = filteredResponseSavingAccount.custAccount;

    this.curr = getCurrencySymbol(filteredResponseSavingAccount.custAccount[0].accountCurrency, "narrow");
    this.currentBalance = this.users[0].amount;

    this.slideOneForm.get('accountNumber').patchValue(this.users[0].accountId);
    this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
    this.slideOneForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);
  }
  changeSelectedCountryCode(value: string): void {
    // this.selectedCountryCode = value;
  }



  goToHomepage() {
    this.router.navigate(['/tabs/home']);
  }
  goToNextPage(fb) {
    this.flag = false;

  }
  goToPreviousPage() {
    this.flag = true;
  }
  goToNextScreen() {
    this.api.setIndex({
      index: 'CQW'
    });
    this.router.navigate(['token-generation']);
  }
  save(form) {

    console.log(form)
    form.transactionDate.toString();

    var date = new Date(form.transactionDate);
    console.log(date) //4/
    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    form.transactionDate = latest_date;

    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
    this.currencyData = this.currencies.find(x => x.countryCode == form.transactionCurrency);
    form.transactionCurrency = this.currencyData.currencyCode;
    // form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');

    form.customerId = this.customerId;
    form.productCode = this.productCode;
    form.tokenOrigin = this.tokenOrigin;

    console.log(form);
    form.transactionTime=this.format24HrsTo12Hrs(form.transactionTime);
    this.accountNum = form.accountNumber;
    this.transactionAmount = form.transactionAmount;
    console.log(this.transactionAmount);
    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();

    localStorage.setItem("AccountNumber", this.accountNum);
    localStorage.setItem("TransactionDate", this.transDate);
    // localStorage.setItem("TransactionTime", form.transactionTime);
    localStorage.setItem("TransactionAmount", this.transactionAmount);
    localStorage.setItem("TransactionBranch", form.transactionBranch);
    //console.log(this.transactionAmount);
    form.transactionAmount=form.transactionAmount.replace(/,/g, '');
    console.log(this.transactionAmount);
    //console.log(form);
    this.api.cashDepositSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
      this.chequeWithdrawal = resp;
      localStorage.setItem("TransactionTime", resp.transactionTime);
      this.transactionId = this.chequeWithdrawal.transactionId;
      console.log('transactionId::',this.transactionId);
     if( this.chequeWithdrawal === 200 || this.chequeWithdrawal !== null ){
       this.shareDataService.shareTransactionId(this.transactionId);
       this.slideOneForm.reset();
       this.router.navigate(['token-generation']);
      }

    });


  }
  format24HrsTo12Hrs(time){
    var formatted = moment(time, "HH:mm").format("LT");
    return formatted;
  }
  openPopup()
  { console.log("popup");
    this.modalController.create({
      component:TimeSlotsComponent,
      componentProps:{
        date:this.slideOneForm.get('transactionDate').value,
      }
    }).then(modalResp=>{
      modalResp.present()
      modalResp.onDidDismiss().then(res=>{
        if(res.data!=null)
        {
          console.log(res);
          this.slideOneForm.get('transactionTime').patchValue(res.data);
        }
      })
    })
  }
  accountEvent(event) {
    console.log("event", event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      console.log('backend accbal', accbal);
      this.valueSet(accbal.currentBalance);
      this.currentBalance = accbal.amount;
      // console.log(this.slideOneForm.controls)
      this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
      // this.slideOneForm.controls.transactionAmount.patchValue(accbal.amount);
      this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
      this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
      localStorage.setItem("AccBranch", accbal.accountBranch);
      for(let i in this.currencies) {
        this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
        this.slideOneForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
    }
      // this.users=dropdown;


    });

  }
  valueSet(currentBalance) {
    this.currentBalance = currentBalance;

  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: BranchComponent,
      id: "branchModal",
      componentProps: {
      }
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        let branch = modelData.data;
        console.log('Modal Data for branch: ', modelData.data);
        this.slideOneForm.get('transactionBranch').patchValue(modelData.data['data'].branchName);
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
