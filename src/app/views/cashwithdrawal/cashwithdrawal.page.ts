import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController, IonDatetime } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { getCurrencySymbol } from '@angular/common';
import { DataService } from "src/app/services/data.service";
import { BranchComponent } from 'src/app/components/branch/branch.component';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoadingService } from 'src/app/services/loading.service';

import { TimeSlotsComponent } from 'src/app/components/time-slots/time-slots.component';



@Component({
  selector: 'app-cashwithdrawal',
  templateUrl: './cashwithdrawal.page.html',
  styleUrls: ['./cashwithdrawal.page.scss'],
})
export class CashwithdrawalPage implements OnInit {
  IntValue: any;
  title: any = 'Cash Withdrawal';
  savingAccount: any[];
  // maxData : any = (new Date()).getFullYear() + 3;
  minDate = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
  slideOneForm: FormGroup;
  currentBalance: any;
  submitted: boolean = true;
  submitted1: boolean = true;
  productCode = "CHW";
  tokenOrigin = "Mobile";
  phoneNumber: string;
  currencyValues: any;
  currencies: any;
  currencyData: any;
  transactionId: any;
  nearestBrn: boolean;
  timeSlots: any;
  customPickerOptions: {};
  mydt: any;
  brnflg: any;
  accBranch: string;
  displayRadio: boolean;
  tokenCount: any;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private fb: FormBuilder,
    public loading: LoadingService,
    public datepipe: DatePipe,
    private api: ApiService,
    private toastService:ToastService,
    public toastCtrl: ToastController,
    private shareDataService: DataService,
    private cdr: ChangeDetectorRef,
  ) { }
  //for comma separator transaction amount
  //transactionAmount:string;
  transactionAmount: any;
  transAmount: string;
  //transAmount:number;
  isedit: boolean = true;
  transAmt: any;
  //transactionAmount: string;
  accountBranch = 'Loita street';
  flag: boolean = true;
  currencyValue: string;
  cashWithdrawResponse: any;
  users: any[] = [];
  customerId: any
  accountNum: string;
  transDate: string
  transTime: string;
  curr: string;
  customerDetails: any;
  selectAbleColor: string = "secondary";
  trnBrn = null;
  accountInfo: any;

  ngOnInit() {

    this.customerId = sessionStorage.getItem('customer_id');
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber", this.phoneNumber);
    this.getCountrynameValues();
    console.log("customer_id", this.customerId);
    // this.customerId = sessionStorage.getItem('customer_id');
    //   this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //     console.log('backend dropdown', dropdown);
    //     this.users=dropdown;
    //     if(dropdown==null){
    //       this.openToast();
    //     }
    //   });
    this.slideOneForm = this.fb.group({
      transactionId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      productCode: ['CHW', [Validators.required]],
      tokenOrigin: ['Mobile', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountBalance: ['', [Validators.required]],
      transactionCurrency: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required,]],
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
    });
    console.log(this.slideOneForm.value);

    this.loadData();

    this.slideOneForm.get('branchFlag').valueChanges.subscribe(val => {
      console.log("branch flag? val", val);
      console.log("branch flag?", this.brnflg);
      localStorage.setItem("BranchFlag", val);
      // if (val == false) {
      //   console.log("1st if");
      //   this.slideOneForm.get('transactionBranch').patchValue("");
      //   this.nearestBrn = true;
      // }
      this.brnflg = val;
      if (this.brnflg == false && val == false) {
        console.log("2nd if");
        this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
        this.nearestBrn = true;
      }

      else {
        console.log("else");
        this.nearestBrn = false;
        // this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
        this.accBranch = localStorage.getItem("AccBranch");
        console.log(this.accBranch);
        this.slideOneForm.controls.transactionBranch.patchValue(this.accBranch);
        // this.slideOneForm.get('transactionBranch').patchValue(this.customerDetails.custAccount[0].accountBranch);
      }
      if (this.brnflg == true && val == false) {
        this.slideOneForm.controls.transactionBranch.patchValue(this.accBranch);
        this.nearestBrn = true;
      }

    })
    this.shareDataService.getAccountInfo.subscribe(data => {
      this.accountInfo = data;
      console.log(data);
      this.api.getNumberOfCrowd(this.accountInfo.accountBranch)
        .subscribe((data1: any) => {
          this.tokenCount = data1.tokenCount
        })
    })
  }

  loadData() {
    this.loading.present();
    this.api.custpomerDetails(this.phoneNumber)
      .subscribe((resp) => {
        this.loading.dismiss();
        console.log('backend resp in home', resp);
        this.customerDetails = resp;
        this.savingAccountFun(resp);
        // if(this.customerDetails.accountInfo.status == 'APPROVED'){
        // this.savingAccountFun(resp);
        // }
      }, (err: any) => {
        this.loading.dismiss();
      })
  }

  get f() { return this.slideOneForm.controls; }

  getCountrynameValues() {

    this.api.getCurrencyValues().subscribe((allCurrencyValues: any) => {
      this.currencies = allCurrencyValues;
    });
  }


  isShow: boolean = true;

  selectedCountryCode = '';


  numberOnlyValidation(event: any) {
    this.transAmt = event.target.value;
    console.log(event.target.value);
    this.IntValue = Math.floor(this.slideOneForm.value.transactionAmount).toString().length;
    // if (this.IntValue > 3) {
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
      this.cdr.markForCheck();



    }
    // console.log(this.transAmt);
    console.log(this.currentBalance);
    console.log(this.transAmt);
    this.transAmt = this.transAmt.replace(/,/g, '');
    console.log(this.transAmt);
    if (parseFloat(this.currentBalance) < parseFloat(this.transAmt)) {
      console.log("Bigger");
      this.openToast1();
      // this.snack.open(`Transaction Amount should not exceed than Account Balance`, 'OK', {
      //   duration: 2000,
      //   verticalPosition: 'top',
      //   horizontalPosition: 'right'
      // });
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

      if (button === 'disable2') {
        if (v.transactionBranch != '' && v.transactionDate != '' && v.transactionTime != '' && v.accountNo != '') {
          this.submitted1 = false;
        } else {
          this.submitted1 = true;
        }
      }

    });
  }

  selectCurrencyCode(currency) {
    console.log(currency);
    console.log(this.currencies)
    this.currencyData = this.currencies.find(x => x.countryCode == currency);
    this.selectedCountryCode = this.currencyData.countryCode.toLowerCase();
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

  goToBranch() {
    this.router.navigate(['cashwithdrawal/branch']);
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
  goToNextScreen(form) {
    console.log(form);
    this.api.setIndex({
      index: 'CHW'
    });
    form.transactionDate.toString();

    var date = new Date(form.transactionDate);
    console.log(date) //4/
    let latest_date = this.datepipe.transform(date, 'yyyy-MM-dd');
    form.transactionDate = latest_date;

    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
    this.currencyData = this.currencies.find(x => x.countryCode == form.transactionCurrency);
    form.transactionCurrency = this.currencyData.currencyCode;
    form.accountNumber = form.accountNumber;
    form.productCode = this.productCode;
    form.transactionTime = this.format24HrsTo12Hrs(form.transactionTime);
    // form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
    form.customerId = this.customerId;

    form.tokenOrigin = 'Mobile';
    console.log(form);
    this.accountNum = form.accountNumber;
    this.transactionAmount = form.transactionAmount;
    console.log(this.transactionAmount);

    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();

    localStorage.setItem("AccountNumber", form.accountNumber);
    localStorage.setItem("TransactionDate", this.transDate);

    localStorage.setItem("TransactionAmount", form.transactionAmount);
    form.transactionAmount = form.transactionAmount.replace(/,/g, '');
    console.log(this.transactionAmount);
    console.log(form);
    localStorage.setItem("TransactionBranch", form.transactionBranch);
    console.log(form);

    console.log("after", form);
    // this.format24HrsTo12Hrs(form.transactionTime);
    this.api.cashDepositSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
      this.cashWithdrawResponse = resp;
      this.transactionId = this.cashWithdrawResponse.transactionId;
      localStorage.setItem("TransactionTime", resp.transactionTime);
      if (this.cashWithdrawResponse === 200 || this.cashWithdrawResponse !== null) {
        this.shareDataService.shareTransactionId(this.transactionId);
        this.slideOneForm.reset();
        this.router.navigate(['token-generation']);
        console.log('transactionId::', this.transactionId);
      }
    });
  }
  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Account Number is not existing for this customer Id',
      duration: 5000
    });
    toast.present();
  }
  lastTranc: LastTransaction[] = [
    {
      transBranch: 'asds',
      accBranch: 'Test'
    },
    {
      transBranch: 'Test',
      accBranch: 'Test'
    },
    {
      transBranch: 'Mananthavady',
      accBranch: 'Test'
    },
    {
      transBranch: 'Mananthavady',
      accBranch: 'Test'
    },
    {
      transBranch: 'Mananthavady',
      accBranch: 'Test'
    },
    {
      transBranch: 'Mananthavady',
      accBranch: 'Test'
    }
  ]
  accountEvent(event) {
    this.isedit = false;
    console.log("events::", event);
    console.log("events details::", event.detail);
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
      if (accbal.lastTransactions != null) {
        if (accbal.lastTransactions.length <= 2) {
          this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
        }
        else {

          var brnCnt = 0;
          var brnOldCnt = 0;
          console.log("Else", accbal.lastTransactions);
          for (var i = 0; i < accbal.lastTransactions.length; i++) {
            if (accbal.lastTransactions[i].transactionBranch != null) {
              for (var n = 0; n < accbal.lastTransactions.length; n++) {
                if (accbal.lastTransactions[n].transactionBranch != null) {
                  if (accbal.lastTransactions[i].transactionBranch === accbal.lastTransactions[n].transactionBranch) {
                    brnCnt = brnCnt + 1;
                  }
                }
              }
            }
            if (brnOldCnt < brnCnt && brnCnt >= 2) {
              this.trnBrn = accbal.lastTransactions[i].transactionBranch;
              brnOldCnt = brnCnt;
              console.log("yhjghguuyjgh");
            }
            brnCnt = 0;
          }
          if (this.trnBrn != null && this.trnBrn !== accbal.accountBranch) {
            console.log(this.trnBrn);
            this.slideOneForm.controls.branchFlag.patchValue(false);
            this.slideOneForm.controls.transactionBranch.patchValue(this.trnBrn);
            console.log(localStorage.getItem("BranchFlag"));
            this.brnflg = localStorage.getItem("BranchFlag");

            this.brnflg = false;
            this.nearestBrn = true;
          } else {
            this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
            this.nearestBrn = false;
            this.brnflg = true;
            console.log(this.nearestBrn);

          }
        }
      }
      else {
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
  savingAccountFun(filteredResponseSavingAccount) {

    console.log(filteredResponseSavingAccount);
    this.users = filteredResponseSavingAccount.custAccount;
    this.curr = getCurrencySymbol(filteredResponseSavingAccount.custAccount[0].accountCurrency, "narrow");
    this.currentBalance = this.users[0].amount;
    if (this.accountInfo.accountId != null) {
      this.slideOneForm.get('accountNumber').patchValue(this.accountInfo.accountId);
    } else {
      this.slideOneForm.get('accountNumber').patchValue(this.users[0].accountId);
    }
    console.log("user::", this.users);
    this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
    this.slideOneForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);
    this.slideOneForm.controls.accountBranch.patchValue(filteredResponseSavingAccount.custAccount[0].accountBranch);
    this.slideOneForm.get('transactionBranch').patchValue(filteredResponseSavingAccount.custAccount[0].accountBranch);
    this.cdr.markForCheck();
  }

  async showToast(errorMessage) {
    const toast = await this.toastCtrl.create({
      message: `${errorMessage}`,//'OTP has been sent again',
      duration: 5000
    });
    toast.present();
  }
  gettingAvailableSlots() {
    console.log("here in availabel slotshhhhhhhh");
    console.log(this.slideOneForm.controls.transactionDate.value);
    // let date=new Date()
    if (this.slideOneForm.controls.transactionDate.value != null) {
      let date = this.datepipe.transform(this.slideOneForm.controls.transactionDate.value, 'yyyy-MM-dd');
      let date1 = this.datepipe.transform(date, 'yyyy-MM-dd');
      console.log("here in slots", date1);
      this.api.gettingAvailableSlots(date1).subscribe(resp => {
        console.log(resp);
        this.timeSlots = resp;

      })
    }
    else {
      return;
    }
  }
  onSelectiongTimeSlots(event, data) {
    console.log("hitting", data);
    this.slideOneForm.get('transactionTime').patchValue(data);
    console.log(this.slideOneForm.value);
    if (this.selectAbleColor === "secondary") {
      this.selectAbleColor = "primary";
    }
    else {
      this.selectAbleColor = "secondary";
    }
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




}


interface CountryType {
  code: string;
  countryName: string;
  accountCurrency: string;
  currencyName: string;
}
interface LastTransaction {
  transBranch: String;
  accBranch: string;

}
