import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { format } from "date-fns"
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { ModalController, ToastController } from '@ionic/angular';
import { getCurrencySymbol } from '@angular/common';
import { DataService } from "src/app/services/data.service";
import { BranchComponent } from 'src/app/components/branch/branch.component';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TimeSlotsComponent } from 'src/app/components/time-slots/time-slots.component';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-cashdeposit',
  templateUrl: './cashdeposit.page.html',
  styleUrls: ['./cashdeposit.page.scss'],
})
export class CashdepositPage implements OnInit {
  title: any = 'Cash Deposit';
  productCode = "CHD";
  tokenOrigin = "Mobile";
  cashDepositResp: any;
  transactionId: any;
  depositForm: FormGroup;
  currentBalance: any;
  customerId: string;
  submitted: boolean = true;
  submitted1: boolean = true;
  phoneNumber: string;
  curr: string;
  currencyValues: any;
  currencyData: any;
  currencies: any;
  customerDetails: any;
  IntValue: number;
  nearestBrn: boolean;
  accountInfo:any;
  constructor(
    public toastCtrl: ToastController,
    private router: Router,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    public loading: LoadingService,
    private api: ApiService,
    private toastController: ToastController,
    private modalController: ModalController,
    private shareDataService: DataService, 
    private cdr: ChangeDetectorRef) { }
  //for transaction amount comma separator
  // transactionAmount = "10,000";
  transactionAmount: any;
  transAmount: string;
  //transAmount:number;
  isedit: boolean = true;
  transAmt: any;
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
  trnBrn = null;
  brnflg: any;
  accBranch: string;
  ngOnInit() {
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    this.customerId = sessionStorage.getItem('customer_id');
    console.log("customer_id", this.customerId)
    this.getCountrynameValues();
    // this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //   console.log('backend dropdown', dropdown);
    //   this.users = dropdown;

    //   if (dropdown == null) {
    //     this.openToast();
    //   }

    // });

    this.depositForm = this.fb.group({
      transactionId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      productCode: ['CHD', [Validators.required]],
      tokenOrigin: ['Mobile', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountBalance: ['', [Validators.required]],
      transactionCurrency: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[1-9]\d*$/)]],
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
      version: ['', [Validators.required]]
    })
    console.log(this.depositForm.value);


    this.loadData();
    this.onChanges();
    

    //  let disableBtn = false;
    // this.depositForm.valueChanges 
    //             .subscribe((changedObj: any) => {
    //                 //  this.disableBtn = this.depositForm.valid;
    //                 console.log('transactionAmount :: ',this.depositForm.controls.transactionAmount)
    //             });
    //  console.log(this.countries);
  
    this.shareDataService.getAccountInfo.subscribe(data=>{
      this.accountInfo=data;
      console.log(data);
    })

   

  }

  loadData() {
    this.loading.present();
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in home', resp);
      this.loading.dismiss();
      this.customerDetails = resp;
      this.savingAccountFun(resp);
    }, (err: any) => {
      this.loading.dismiss();
    })
  }


  onChanges(){
    
    this.depositForm.get('branchFlag').valueChanges.subscribe(val => {
      console.log("branch flag? val", val);
      console.log("branch flag?", this.brnflg);
      localStorage.setItem("BranchFlag", val);
      this.brnflg=val;
      // if (val == false) {
      //   console.log("1st if");
      //   this.slideOneForm.get('transactionBranch').patchValue("");
      //   this.nearestBrn = true;
      // }
      if (this.brnflg == false && val == false) {
        console.log("1st if");
        this.depositForm.controls.transactionBranch.patchValue(this.trnBrn);
        this.nearestBrn = true;
      } 
     
      else {
        console.log("else");
        this.nearestBrn = false;
        // this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
        this.accBranch=localStorage.getItem("AccBranch");
        console.log(this.accBranch);
        this.depositForm.controls.transactionBranch.patchValue(this.accBranch);
        // this.slideOneForm.get('transactionBranch').patchValue(this.customerDetails.custAccount[0].accountBranch);
      }
       if (this.brnflg == true && val == false) {
        console.log(this.accBranch);
        console.log("2nd if");
        this.depositForm.controls.transactionBranch.patchValue(this.accBranch);
        this.nearestBrn = true;
      } 

    })
  }

  get f() { return this.depositForm.controls; }

  getCountrynameValues() {
    this.api.getCurrencyValues().subscribe((allCurrencyValues: any) => {
      this.currencies = allCurrencyValues;
    });
  }



  numberOnlyValidation(event: any) {
    this.transAmt = event.target.value;
    console.log(event.target.value);
    this.IntValue = Math.floor(this.depositForm.value.transactionAmount).toString().length;
    // if (this.IntValue > 3) {
      if (this.IntValue > 1) {
      //old changes
      // const pattern = /[0-9.,]/;
      // let inputChar = String.fromCharCode(event.charCode);
      // if (!pattern.test(inputChar)) {
      //   // invalid character, prevent input
      //   event.preventDefault();
      // }

      // new code added for transaction amount comma separator
      // 
      //  console.log(this.slideOneForm)
      //  console.log(event.value);
      //const pattern = /[0-9.,]/;
      let value: string;
      value = this.depositForm.value.transactionAmount;

      //let inputChar = String.fromCharCode(event.charCode);
      // ;
      this.transAmount = value;
      // 
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

      this.cdr.markForCheck();
    }
    // console.log(this.transAmt);
    console.log(this.currentBalance);
    console.log(this.transAmt);
    this.transAmt = this.transAmt.replace(/,/g, '');
    console.log(this.transAmt);
    // if(parseFloat(this.currentBalance) < parseFloat(this.transAmt)){
    //   console.log("Bigger");
    //   this.openToast1();
    //   // this.snack.open(`Transaction Amount should not exceed than Account Balance`, 'OK', {
    //   //   duration: 2000,
    //   //   verticalPosition: 'top',
    //   //   horizontalPosition: 'right'
    //   // });
    // }
    //   // this.slideOneForm.controls['transactionAmount'].setValidators();
    //   else{
    //     return;
    //   }
  }
  isShow: boolean = true;

  selectedCountryCode = '';

  method() {

  }
  async openToast1() {
    const toast = await this.toastCtrl.create({
      message: 'Transaction Amount should not exceed than Account Balance',
      duration: 2000
    });
    toast.present();
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
        this.depositForm.get('transactionBranch').patchValue(modelData.data['data'].branchName);
      }
    });

    return await modal.present();
  }


  selectCurrencyCode(currency) {
    console.log(currency);
    this.currencyData = this.currencies.find(x => x.countryCode == currency);
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


    var date = new Date(form.transactionDate);
    console.log(date) //4/
    let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    form.transactionDate = latest_date;

    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
    this.currencyData = this.currencies.find(x => x.countryCode == form.transactionCurrency);
    form.transactionCurrency = this.currencyData.currencyCode;
    // form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
    form.customerId = this.customerId;
    form.productCode = this.productCode;
    form.tokenOrigin = this.tokenOrigin;
    console.log(form);
    this.accountNum = form.accountNumber;
    this.transactionAmount = form.transactionAmount;
    console.log(this.transactionAmount);
    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();
    form.transactionTime=this.format24HrsTo12Hrs(form.transactionTime);
    localStorage.setItem("AccountNumber", this.accountNum);
    localStorage.setItem("TransactionDate", this.transDate);
    // localStorage.setItem("TransactionTime", form.transactionTime);
    localStorage.setItem("TransactionAmount", this.transactionAmount);
    localStorage.setItem("TransactionBranch", form.transactionBranch);
    form.transactionAmount = form.transactionAmount.replace(/,/g, '');
    console.log(this.transactionAmount);
    console.log(form);
    console.log("form::", form);

    this.api.cashDepositSave(form).subscribe((resp) => {
      localStorage.setItem("TransactionTime", resp.transactionTime);
       this.cashDepositResp = resp;
      this.transactionId = this.cashDepositResp.transactionId;
      console.log('transactionId::', this.transactionId);
      if (this.cashDepositResp === 200 || this.cashDepositResp !== null) {
        this.shareDataService.shareTransactionId(this.transactionId);
        this.depositForm.reset();
        this.router.navigate(['token-generation']);
      }
    });


  }
  accountEvent(event) {
    this.isedit = false;
    console.log("event", event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      // console.log('backend accbal', accbal.lastTransactions);
      this.valueSet(accbal.currentBalance);
      // console.log('backend accbal', accbal);
      // console.log(this.slideOneForm.controls.transactionCurrency);
      this.currentBalance = accbal.amount;

      this.depositForm.controls.accountBalance.patchValue(accbal.amount);
      this.depositForm.controls.accountBranch.patchValue(accbal.accountBranch);
      localStorage.setItem("AccBranch", accbal.accountBranch);
      // console.log(this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch));
      // console.log(accbal);
      // this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
      // this.selectCurrencyCode(accbal.accountCurrency);
      //;
      // console.log(accbal.transactionAmount);
      if (accbal.transactionAmount != null || accbal.transactionAmount != undefined) {
        this.numberOnlyValidation(accbal.transactionAmount);
      }
      // console.log('backend accbal', accbal.lastTransactions);
      if(accbal.lastTransactions!=null){
        if(accbal.lastTransactions.length <=2 ){
          this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
          }
          else{
           
            var brnCnt = 0;
            var brnOldCnt = 0 ;
            console.log("Else",accbal.lastTransactions);
            for(var i=0;i<accbal.lastTransactions.length;i++){
              if(accbal.lastTransactions[i].transactionBranch != null){
                for(var n=0;n<accbal.lastTransactions.length;n++){
                  if(accbal.lastTransactions[n].transactionBranch != null){
                    if(accbal.lastTransactions[i].transactionBranch===accbal.lastTransactions[n].transactionBranch){
                      brnCnt = brnCnt + 1 ;
                    }
                  }
                }
              }
              if(brnOldCnt < brnCnt && brnCnt >= 2){
                this.trnBrn = accbal.lastTransactions[i].transactionBranch ;
                brnOldCnt = brnCnt ;
                console.log("yhjghguuyjgh");
              }
              brnCnt = 0;
            }
            if (this.trnBrn != null && this.trnBrn!==accbal.accountBranch){
              console.log(this.trnBrn);
              this.depositForm.controls.branchFlag.patchValue(false);
              this.depositForm.controls.transactionBranch.patchValue(this.trnBrn);
              console.log(localStorage.getItem("BranchFlag"));
              this.brnflg=localStorage.getItem("BranchFlag");
              
              this.brnflg=false;
              this.nearestBrn = true;
            } else {
              this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
              this.nearestBrn = false;
              this.brnflg=true;
              console.log(this.nearestBrn);
          
            }
          }
      }
      else{
        this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
        this.nearestBrn = false;
      }
      // if (accbal.lastTransactions != null) {
      //   if (accbal.lastTransactions.length <= 2) {
      //     this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
      //   }
       
      //   else {
      //     var trnBrn = null;
      //     var brnCnt = 0;
      //     var brnOldCnt = 0;
      //     console.log("Else", accbal.lastTransactions);
      //     for (var i = 0; i < accbal.lastTransactions.length; i++) {
      //       if (accbal.lastTransactions[i].transactionBranch != null) {
      //         for (var n = 0; n < accbal.lastTransactions.length; n++) {
      //           if (accbal.lastTransactions[n].transactionBranch != null) {
      //             if (accbal.lastTransactions[i].transactionBranch === accbal.lastTransactions[n].transactionBranch) {
      //               brnCnt = brnCnt + 1;
      //             }
      //             if (accbal.lastTransactions[i].transactionBranch != accbal.lastTransactions[n].transactionBranch) {
      //               trnBrn = accbal.lastTransactions[i].accountBranch;
      //             }
      //           }

      //         }
      //       }
      //       if (brnOldCnt < brnCnt && brnCnt >= 2) {
      //         trnBrn = accbal.lastTransactions[i].transactionBranch;
      //         brnOldCnt = brnCnt;
      //       }
          
      //       brnCnt = 0;
      //     }
      //     if (trnBrn != null) {
      //       this.slideOneForm.controls.transactionBranch.patchValue(trnBrn);
      //     } else {
      //       this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
      //     }
      //   }
      // }
      // else {
      //   this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
      // }
      // console.log(accbal.accountCurrency.countryName);
      for (let i in this.currencies) {
        this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
        this.depositForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
      }
      // this.selectedCountryCode = (currency.code).toLowerCase();
      // this.users=dropdown;

      //8042666041 8042666055
    });


  }
  // accountEvent(event) {
  //   console.log("event", event.detail.value)
  //   this.api.accountBalance(event.detail.value).subscribe((accbal) => {
  //     console.log('backend accbal', accbal.currentBalance);
  //     this.valueSet(accbal.currentBalance);
  //     console.log('backend accbal', accbal.amount);
  //     this.currentBalance = accbal.amount;
  //     console.log(this.depositForm.controls)
  //     //;
  //     console.log(accbal.transactionAmount);

  //     this.depositForm.controls.accountBalance.patchValue(accbal.amount);
  //     this.depositForm.controls.accountBranch.patchValue(accbal.accountBranch);
    
  //     localStorage.setItem("AccBranch", accbal.accountBranch);
  //     // this.depositForm.controls.transactionCurrency.patchValue(accbal.countryCode);
  //     // this.selectCurrencyCode(accbal.accountCurrency);
  //     // this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
  //     console.log(accbal.transactionAmount);
  //     if (accbal.transactionAmount != null || accbal.transactionAmount != undefined) {
  //       this.numberOnlyValidation(accbal.transactionAmount);
  //     }
  //     if (accbal.lastTransactions != null) {
  //       if (accbal.lastTransactions.length <= 2) {
  //         this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
  //       }
  //       else {
         
  //         var brnCnt = 0;
  //         var brnOldCnt = 0;
  //         console.log("Else", accbal.lastTransactions);
  //         for (var i = 0; i < accbal.lastTransactions.length; i++) {
  //           if (accbal.lastTransactions[i].transactionBranch != null) {
  //             for (var n = 0; n < accbal.lastTransactions.length; n++) {
  //               if (accbal.lastTransactions[n].transactionBranch != null) {
  //                 if (accbal.lastTransactions[i].transactionBranch === accbal.lastTransactions[n].transactionBranch) {
  //                   brnCnt = brnCnt + 1;
  //                 }
  //               }
  //             }
  //           }
  //           if (brnOldCnt < brnCnt && brnCnt >= 2) {
  //             this.trnBrn = accbal.lastTransactions[i].transactionBranch;
  //             brnOldCnt = brnCnt;
  //           }
  //           brnCnt = 0;
  //         }
  //         if (this.trnBrn != null) {
  //           this.depositForm.controls.transactionBranch.patchValue(this.trnBrn);
  //         } else {
  //           this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
  //         }
  //       }
  //     }
  //     else {
  //       this.depositForm.controls.transactionBranch.patchValue(accbal.accountBranch);
  //     }
  //     // this.users=dropdown;
  //     for (let i in this.currencies) {
  //       this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
  //       this.depositForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
  //     }
  //   });

  // }
  savingAccountFun(filteredResponseSavingAccount) {

    console.log(filteredResponseSavingAccount);
    this.users = filteredResponseSavingAccount.custAccount;


    this.curr = getCurrencySymbol(filteredResponseSavingAccount.custAccount[0].accountCurrency, "narrow");
    this.currentBalance = this.users[0].amount;

    if(this.accountInfo.accountId!=null){
      this.depositForm.get('accountNumber').patchValue(this.accountInfo.accountId);
    }else{
      this.depositForm.get('accountNumber').patchValue(this.users[0].accountId);
    }
    this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
    this.depositForm.controls.accountBranch.patchValue(filteredResponseSavingAccount.custAccount[0].accountBranch);
    this.depositForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);
    this.depositForm.get('transactionBranch').patchValue(filteredResponseSavingAccount.custAccount[0].accountBranch);

    this.cdr.markForCheck();
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
  format24HrsTo12Hrs(time){
    var formatted = moment(time, "HH:mm").format("LT");
    return formatted;
  }
  openPopup()
  { console.log("popup");
    this.modalController.create({
      component:TimeSlotsComponent,
      componentProps:{
        date:this.depositForm.get('transactionDate').value
      }
    }).then(modalResp=>{
      modalResp.present()
      modalResp.onDidDismiss().then(res=>{
        if(res.data!=null)
        {
          console.log(res);
          this.depositForm.get('transactionTime').patchValue(res.data);
        }
      })
    })
  }
}


interface CountryType {
  code: string;
  countryName: string;
  accountCurrency: string;
  currencyName: string;

}
