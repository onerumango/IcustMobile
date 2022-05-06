import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, IonDatetime, IonInfiniteScroll } from '@ionic/angular';
import { Location } from "@angular/common";
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TransactionPopupPage } from '../transaction-popup/transaction-popup.page';
import { filter } from 'rxjs/operators';
import { format, getDate, getMonth, getYear, parseISO } from 'date-fns';



@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  transactionDataArr: any;
  notToShowAll2: boolean = false;
  loggedInCust: any;
  displayInfo: boolean = false;
  message: string;
  data: any;
  accountInfo: any;
  modelData: any;
  phoneNumber: string;
  customerDetails: any;
  users: any[] = [];
  accountNumber: any;
  accountId: any;
  custAccountData: any;
  custAccount: any[];
  page: number;

  fromDate: any;
  toDate: any;


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  trxnArrayList: any[] = [];
  formattedFromDate: string;
  formattedToDate: string;

  constructor(private router: Router, private alertController: AlertController, public navCtrl: NavController,
    private loadingService: LoadingService, public modalCtrl: ModalController,
    private apiService: ApiService, private cdr: ChangeDetectorRef, private location: Location, private shareDataService: DataService) { }

  ngOnInit() {
    this.phoneNumber = localStorage.getItem('PhoneNumLogin');
    console.log("phoneNumber", this.phoneNumber);

    this.shareDataService.getAccountInfo.subscribe(data => {
      console.log("accountInfo :: ", data);
      this.accountInfo = data;
      if (this.accountInfo != null && this.accountInfo != undefined) {
        this.accountNumber = this.accountInfo.accountId;
      }
    });
    this.loadData();

    this.getTransactionByAccountId('onload', 0, '', null, null);
   
  }

  getTransactionByAccountId(dataLoad, page, event, formattedFromDate, formattedToDate) {
    this.loadingService.present();
    this.loggedInCust = sessionStorage.getItem('customer_id');
    this.page = page
    // console.log("Logged In Customer -- ", this.loggedInCust);
    this.apiService.getTransactionByAccountId(this.accountNumber, this.page, formattedFromDate, formattedToDate)
      .subscribe(data => {
        this.loadingService.dismiss();
        if (data != null || data != undefined) {
          console.log("data:::", data);
          if (formattedFromDate != null) {
            if (this.page == 0) {
              // console.log('from date not null :: ',formattedFromDate);
              this.transactionDataArr = [];
              this.trxnArrayList = [];
            }
          }
          this.transactionDataArr = data;
          this.pushArray(this.trxnArrayList, this.transactionDataArr.content)
          if (dataLoad === 'scroll') {
            event.target.disabled = false;
          }
        }
        else {
          this.displayInfo = true;
          this.message = "There are no transactions to display";
        }
        this.cdr.markForCheck();
      }, (err: any) => {
        console.error('error :', err);
        if (err.error == null) {
          this.loadingService.dismiss();
          this.transactionDataArr = [];
          this.trxnArrayList = [];
          this.displayInfo = true;
          this.message = "There are no transactions to display";
        }
      });
  }

  pushArray(arr, arr2) {
    arr.push.apply(arr, arr2);
    // console.log("trxnArrayList:::", arr);
    this.trxnArrayList = arr;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  onScrollingFinished(event) {
    // console.log('event  called when scrolled :: ', event)
    event.target.complete();
    this.page = this.page + 1;
    if (this.transactionDataArr.content.length === 20) {
      // console.log('Done');
      event.target.disabled = true;
      this.getTransactionByAccountId('scroll', this.page, event, null, null);
    }
  }
  changed(event) {
    const formattedFromDate = format(parseISO(this.fromDate), "yyyy-MM-dd'T'HH:mm:ss");
    this.formattedFromDate = formattedFromDate;
    console.log('fromDate :: ',this.formattedFromDate);
    const formattedToDate = format(parseISO(this.toDate), "yyyy-MM-dd'T'HH:mm:ss");
    this.formattedToDate = formattedToDate;
        console.log('toDate :: ',this.formattedToDate);
    console.log('event :: ',event.target.value, this.accountNumber, this.accountInfo);
    if (event.target.value) {
      this.getTransactionByAccountId("dateBase", 0, '', this.formattedFromDate, this.formattedToDate)
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  loadData() {
    //this.loadingService.present();
    this.apiService.custpomerDetails(this.phoneNumber)
      .subscribe((resp) => {
        this.loadingService.dismiss();
        console.log('backend resp in home', resp);
        this.customerDetails = resp;
        console.log("phonenumber resp:", resp);

        this.accountNumber = resp.custAccount.accountId;
        this.custAccountData = resp.custAccount;
        if (resp.custAccount.accountId > 1) {
          this.accountNumber = resp.custAccount.accountId;
          if (this.accountInfo.accountId != null) {
            resp.custAccount.accountId = this.accountInfo.accountId;
          }
        }




        this.savingAccountFun(resp);
        // if(this.customerDetails.accountInfo.status == 'APPROVED'){
        // this.savingAccountFun(resp);
        // }
      }, (err: any) => {
        this.loadingService.dismiss();
      })
  }

  savingAccountFun(filteredResponseSavingAccount) {

    console.log(filteredResponseSavingAccount);
    this.users = filteredResponseSavingAccount.custAccount;
    this.cdr.markForCheck();
  }



  goBack() {
    this.location.back();
  }


  async onClick(event) {
    console.log("Inside onClick", event.transactionId);
    // this.loadingService.present();
    // this.apiService.getByTransactionId(event.transactionId).subscribe(response =>{
    //   console.log("response -- "+response);
    //   this.data = JSON.parse(JSON.stringify(response));
    //   console.log("response -- "+this.data);
    // });

    // let modal = await this.modalCtrl.create({component: TransactionPopupPage,
    //   componentProps: { 
    //     foo: 'hello',
    //     bar: 'world'
    // )},
    let modal = await this.modalCtrl.create({
      component: TransactionPopupPage,
      componentProps: {
        value: event.transactionId
      }
    });

    //   modal.onDidDismiss()
    //   .then((data) => {
    //     const foo = data['data'];
    // });
    return await modal.present();
  }


  // return await modal.present();
  // modal.present();
  // console.log("Event = ",event);
  // this.loadingService.present();
  // this.apiService.getByTransactionId(event.transactionId).subscribe(response =>{
  //   console.log("response -- "+response);
  //   this.data = JSON.parse(JSON.stringify(response));
  //   console.log("response -- "+this.data);
  // });
  // setTimeout(() => {
  //   this.loadingService.dismiss();
  //   this.dialog(this.data);
  // }, 3000);
  // async dialog(data) {
  //   const alert = await this.alertController.create({
  // header: data.trnType,
  //       cssClass: 'alertColor',
  //       inputs: [

  //         {
  //           name: 'Transaction ID',
  //           type: 'text',
  //           value: 'Transaction ID: '+data.transactionId,
  //           disabled: true
  //         },
  //         {
  //           name: 'Account Number',
  //           type: 'text',
  //           value: 'Account Number: '+data.accountNumber,
  //           disabled: true
  //         },
  //         {
  //           name: 'Account Type',
  //           type: 'text',
  //           value: 'Account Type: '+this.accountInfo.accountType ,
  //           disabled: true
  //         },
  //         {
  //           name: 'Account Currency',
  //           type: 'text',
  //           value: 'Account Currency: '+data.transactionCurrency,
  //           disabled: true
  //         },
  //         {
  //           name: 'Transaction Amount',
  //           type: 'text',
  //           value: 'Transaction Amount: '+data.transactionAmount,
  //           disabled: true
  //         },
  //         {
  //           name: 'Balance',
  //           type: 'text',
  //           value: 'Balance: '+data.accountBalance,
  //           disabled: true
  //         },
  //       ],
  //       buttons: ['OK']
  //     });

  //     await alert.present();
  //     let result = await alert.onDidDismiss();
  //     console.log(result);
  //   }

}