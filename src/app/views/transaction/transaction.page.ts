import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  transactionDataArr: any[];
  notToShowAll2: boolean = false;
  loggedInCust: any;
  displayInfo: boolean = false;
  message: string;
  data: any;

  constructor(private router:Router, private alertController: AlertController,
    private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDashboardRecords();
  }

  getDashboardRecords() {
    this.loggedInCust = sessionStorage.getItem('customer_id');
    console.log("Logged In Customer -- ", this.loggedInCust);
    this.apiService.getDashboardDataNew(this.loggedInCust)
      .subscribe(data => {
        console.log("data:::", data);
        if(data.length > 0) {
          this.transactionDataArr = data;
          this.cdr.detectChanges();
          this.cdr.markForCheck();
        }
        else {
          console.log("Inside else");
          this.displayInfo = true;
          this.notToShowAll2 = true;
          this.message = "There are no transactions to display";
          console.log(this.displayInfo, this.message);
        }
      });
  }

  onClick(event) {
    console.log("Event = ",event);
    this.apiService.getByTransactionId(event.transId).subscribe(response =>{
      console.log("response -- "+response);
      this.data = JSON.parse(JSON.stringify(response));
      console.log("response -- "+this.data);
    });
    setTimeout(() => {
      this.dialog(this.data);
    }, 3000);
  }

  async dialog(data) {
    const alert = await this.alertController.create({
      header: data.trnType,
      inputs: [
        {
          name: 'Transaction ID',
          type: 'text',
          value: 'Transaction ID: '+data.transactionId,
          disabled: true
        },
        {
          name: 'Account Number',
          type: 'text',
          value: 'Account Number: '+data.accountNumber,
          disabled: true
        },
        {
          name: 'Account Type',
          type: 'text',
          value: 'Account Type: '+data.accountType,
          disabled: true
        },
        {
          name: 'Account Currency',
          type: 'text',
          value: 'Account Currency: '+data.transactionCurrency,
          disabled: true
        },
        {
          name: 'Transaction Amount',
          type: 'text',
          value: 'Transaction Amount: '+data.transactionAmount,
          disabled: true
        },
        {
          name: 'Balance',
          type: 'text',
          value: 'Balance: '+data.accountBalance,
          disabled: true
        },
      ],
      buttons: ['OK']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
}
