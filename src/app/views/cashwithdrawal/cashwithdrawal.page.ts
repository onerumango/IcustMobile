import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { getCurrencySymbol } from '@angular/common';
import { DataService } from "src/app/services/data.service";
import { BranchComponent } from 'src/app/components/branch/branch.component';


@Component({
  selector: 'app-cashwithdrawal',
  templateUrl: './cashwithdrawal.page.html',
  styleUrls: ['./cashwithdrawal.page.scss'],
})
export class CashwithdrawalPage implements OnInit {
  title: any = 'Cash Withdrawal';
  savingAccount: any[];
  // maxData : any = (new Date()).getFullYear() + 3;
  minDate = new Date().toISOString();
  maxDate: any = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString();
  slideOneForm: FormGroup;
  currentBalance: number;
  submitted: boolean = true;
  submitted1: boolean = true;
  productCode = "CHW";
  tokenOrigin = "Mobile";
  phoneNumber: string;
  currencyValues: any;
  currencies: any;
  currencyData: any;
  constructor(
    private router: Router,
    private modalController: ModalController,
    private fb: FormBuilder,
    private api: ApiService, public toastCtrl: ToastController,
    private shareDataService: DataService
  ) { }
  transactionAmount: string;
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

  ngOnInit() {

    this.customerId = sessionStorage.getItem('customer_id');
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber", this.phoneNumber)
    this.getCountrynameValues();
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in home', resp);
      this.customerDetails = resp;
      this.savingAccountFun(resp);

    })





    console.log("customer_id", this.customerId)
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


    this.slideOneForm.get('branchFlag').valueChanges.subscribe(val => {
      console.log("branch flag?", val);
      if (val == false) {
        this.slideOneForm.get('transactionBranch').patchValue("");
      }else{
        this.slideOneForm.get('transactionBranch').patchValue(this.customerDetails.custAccount[0].accountBranch);
      }
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
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);


    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }

    // this.slideOneForm.controls['transactionAmount'].setValidators();
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
    this.api.setIndex({
      index: 'CHW'
    });
    form.transactionDate.toString();

    var date = new Date(form.transactionDate).toLocaleDateString('en-us');
    console.log(date); //4/
    form.transactionDate = date;
    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
    this.currencyData = this.currencies.find(x => x.countryCode == form.transactionCurrency);
    form.transactionCurrency = this.currencyData.currencyCode;
    form.accountNumber = form.accountNumber;
    form.productCode = this.productCode;

    form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
    form.customerId = this.customerId;

    form.tokenOrigin = 'Mobile';
    console.log(form);
    this.accountNum = form.accountNumber;
    this.transactionAmount = form.transactionAmount;
    console.log(this.transactionAmount);
    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();

    localStorage.setItem("AccountNumber", form.accountNumber);
    localStorage.setItem("TransactionDate", this.transDate);
    localStorage.setItem("TransactionTime", form.transactionTime);
    localStorage.setItem("TransactionAmount", form.transactionAmount);
    localStorage.setItem("TransactionBranch", form.transactionBranch);
    console.log(form);
    this.api.cashDepositSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
      this.cashWithdrawResponse = resp;
      let transactionId = resp.transactionId;
      console.log("transactionId::", transactionId)
      this.shareDataService.shareTransactionId(transactionId);
      this.showToast(resp.transactionId ? 'Success' : resp);
    });
    if (this.cashWithdrawResponse !== null) {
      setTimeout(() => {
        //this.slideOneForm.reset();
        this.router.navigate(['token-generation']);
      }, 100);

    }

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
    console.log("event", event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      // console.log('backend accbal', accbal.lastTransactions);
      this.valueSet(accbal.currentBalance);
      // console.log('backend accbal', accbal);
      // console.log(this.slideOneForm.controls.transactionCurrency);
      this.currentBalance = accbal.amount;

      this.slideOneForm.controls.accountBalance.patchValue(accbal.amount);
      this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
      // console.log(this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch));
      // console.log(accbal.accountCurrency);
      this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
      console.log('backend accbal', accbal.lastTransactions);
      if (accbal.lastTransactions != null) {
        if (accbal.lastTransactions.length <= 2) {
          this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
        }
        else {
          var trnBrn = null;
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
              trnBrn = accbal.lastTransactions[i].transactionBranch;
              brnOldCnt = brnCnt;
            }
            brnCnt = 0;
          }
          if (trnBrn != null) {
            this.slideOneForm.controls.transactionBranch.patchValue(trnBrn);
          } else {
            this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
          }
        }
      }
      else {
        this.slideOneForm.controls.transactionBranch.patchValue(accbal.accountBranch);
      }
      // console.log(accbal.accountCurrency.countryName);
      for(let i in this.currencies) {
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
    this.slideOneForm.get('accountNumber').patchValue(this.users[0].accountId);
    this.selectedCountryCode = filteredResponseSavingAccount.countryCode.toLowerCase();
    this.slideOneForm.controls.transactionCurrency.patchValue(filteredResponseSavingAccount.countryCode);
  }

  async showToast(errorMessage) {
    const toast = await this.toastCtrl.create({
      message: `${errorMessage}` ,//'OTP has been sent again',
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
interface LastTransaction {
  transBranch: String;
  accBranch: string;

}
