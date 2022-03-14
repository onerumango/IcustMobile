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
import { LoadingService } from 'src/app/services/loading.service';



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
  accBranch: string;
  accountInfo: any;


  constructor(private router: Router,
    private fb: FormBuilder,
    private api: ApiService, public toastCtrl: ToastController,
    private modalController: ModalController,
    public datepipe: DatePipe,
    public loading: LoadingService,
    private shareDataService: DataService, private cdr: ChangeDetectorRef) { }
  productCode = 'CQW';
  tokenOrigin = 'Mobile';
  // for transaction amount comma separator
  //transactionAmount="10,000";
  //transactionAmount:double;
  transactionAmount: any;
  transAmount: string;
  //transAmount:number;
  isedit: boolean = true;
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
  trnBrn = null;
  brnflg: any;
  minDate = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();

  ngOnInit() {
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    this.customerId = sessionStorage.getItem('customer_id');
    // this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //   console.log('backend dropdown', dropdown);
    //   this.users=dropdown;
    // });

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
      remarks: ['', [Validators.required]],
      chequeNumber:['',[Validators.required,Validators.maxLength(12)]],
    })
    console.log(this.slideOneForm.value);
    this.getCountrynameValues();
    this.loadData();

    this.slideOneForm.get('branchFlag').valueChanges.subscribe(val => {
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
        this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
        this.nearestBrn = true;
      } 
     
      else {
        console.log("else");
        this.nearestBrn = false;
        // this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
        this.accBranch=localStorage.getItem("AccBranch");
        console.log(this.accBranch);
        this.slideOneForm.controls.transactionBranch.patchValue(this.accBranch);
        // this.slideOneForm.get('transactionBranch').patchValue(this.customerDetails.custAccount[0].accountBranch);
      }
       if (this.brnflg == true && val == false) {
        console.log(this.accBranch);
        console.log("2nd if");
        this.slideOneForm.controls.transactionBranch.patchValue(this.accBranch);
        this.nearestBrn = true;
      } 

    })
    this.shareDataService.getAccountInfo.subscribe(data=>{
      this.accountInfo=data;
      console.log(data);
    })

  }

  loadData() {
    this.loading.present();
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      this.loading.dismiss();
      console.log('backend resp in home', resp);
      this.customerDetails = resp;
      if(this.customerDetails.accountInfo.status == 'APPROVED'){
        this.savingAccountFun(resp);
        }
    }, (err: any) => {
      this.loading.dismiss();
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
    this.transAmt = event.target.value;
    console.log(event.target.value);
    this.IntValue = Math.floor(this.slideOneForm.value.transactionAmount).toString().length;
    if (this.IntValue > 1) {

      let value: string;
      value = this.slideOneForm.value.transactionAmount;

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

      this.cdr.detectChanges();
    }
    // console.log(this.transAmt);
    console.log(this.currentBalance);
    console.log(this.transAmt);
    this.transAmt = this.transAmt.replace(/,/g, '');
    console.log(this.transAmt);
    if (parseFloat(this.currentBalance) < parseFloat(this.transAmt)) {
      console.log("Bigger");
      this.openToast1();

    }
    // this.slideOneForm.controls['transactionAmount'].setValidators();
    else {
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

    if(this.accountInfo.accountId!=null){
      this.slideOneForm.get('accountNumber').patchValue(this.accountInfo.accountId);
    }else{
      this.slideOneForm.get('accountNumber').patchValue(this.users[0].accountId);
    }
    this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
    this.slideOneForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);
    this.slideOneForm.controls.accountBranch.patchValue(filteredResponseSavingAccount.custAccount[0].accountBranch);
    this.slideOneForm.get('transactionBranch').patchValue(filteredResponseSavingAccount.custAccount[0].accountBranch);
    this.cdr.markForCheck();

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
    form.transactionTime = this.format24HrsTo12Hrs(form.transactionTime);
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
    form.transactionAmount = form.transactionAmount.replace(/,/g, '');
    console.log(this.transactionAmount);
    //console.log(form);
    this.api.cashDepositSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
      this.chequeWithdrawal = resp;
      localStorage.setItem("TransactionTime", resp.transactionTime);
      this.transactionId = this.chequeWithdrawal.transactionId;
      console.log('transactionId::', this.transactionId);
      if (this.chequeWithdrawal === 200 || this.chequeWithdrawal !== null) {
        this.shareDataService.shareTransactionId(this.transactionId);
        this.slideOneForm.reset();
        this.router.navigate(['token-generation']);
      }

    });


  }
  format24HrsTo12Hrs(time) {
    var formatted = moment(time, "HH:mm").format("LT");
    return formatted;
  }
  openPopup() {
    console.log("popup");
    this.modalController.create({
      component: TimeSlotsComponent,
      componentProps: {
        date: this.slideOneForm.get('transactionDate').value,
      }
    }).then(modalResp => {
      modalResp.present()
      modalResp.onDidDismiss().then(res => {
        if (res.data != null) {
          console.log(res);
          this.slideOneForm.get('transactionTime').patchValue(res.data);
        }
      })
    })
  }
  // accountEvent(event) {
  //   console.log("event", event.detail.value)
  //   this.api.accountBalance(event.detail.value).subscribe((accbal) => {
  //     console.log('backend accbal', accbal);
  //     this.valueSet(accbal.currentBalance);
  //     this.currentBalance = accbal.amount;
  //     // console.log(this.slideOneForm.controls)
  //     this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
  //     // this.slideOneForm.controls.transactionAmount.patchValue(accbal.amount);
  //     this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
  //     this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
  //     localStorage.setItem("AccBranch", accbal.accountBranch);
  //     for (let i in this.currencies) {
  //       this.selectedCountryCode = (this.currencies[i].countryCode).toLowerCase();
  //       this.slideOneForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
  //     }
  //     // this.users=dropdown;


  //   });

  // }
  accountEvent(event) {
    this.isedit = false;
    console.log("event", event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      // console.log('backend accbal', accbal.lastTransactions);
      this.valueSet(accbal.currentBalance);
      // console.log('backend accbal', accbal);
      // console.log(this.slideOneForm.controls.transactionCurrency);
      this.currentBalance = accbal.amount;

      this.slideOneForm.controls.accountBalance.patchValue(accbal.amount);
      this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
      localStorage.setItem("AccBranch", accbal.accountBranch);
      // console.log(this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch));
      // console.log(accbal);
      // this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
      // this.selectCurrencyCode(accbal.accountCurrency);
      //debugger;
      // console.log(accbal.transactionAmount);
      if (accbal.transactionAmount != null || accbal.transactionAmount != undefined) {
        this.numberOnlyValidation(accbal.transactionAmount);
      }
      // console.log('backend accbal', accbal.lastTransactions);
      if(accbal.lastTransactions!=null){
        if(accbal.lastTransactions.length <=2 ){
          this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
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
              this.slideOneForm.controls.branchFlag.patchValue(false);
              this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
              console.log(localStorage.getItem("BranchFlag"));
              this.brnflg=localStorage.getItem("BranchFlag");
              
              this.brnflg=false;
              this.nearestBrn = true;
            } else {
              this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
              this.nearestBrn = false;
              this.brnflg=true;
              console.log(this.nearestBrn);
          
            }
          }
      }
      else{
        this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
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
        this.slideOneForm.controls.transactionCurrency.patchValue(this.currencies[i].countryCode);
      }
      // this.selectedCountryCode = (currency.code).toLowerCase();
      // this.users=dropdown;

      //8042666041 8042666055
    });


  }
  valueSet(currentBalance) {
    this.currentBalance = currentBalance;

  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
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
