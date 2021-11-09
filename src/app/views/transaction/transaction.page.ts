import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  transactionDataArr: any[];
  demandDraft = "Demand Draft";
  bankersCheque = "Bankers Cheque";
  transactionData;
  DraftData;
  bankersChequedata;
  inputData: string;
  tellerId = "1";
  currencyList: string[] = [];
  currencyInfo: any[] = [];
  tillCount: any;
  countofINR: any = 0;
  countofUSD: any = 0;
  countofAED: any = 0;
  notToShowAll2: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getDashboardRecords();
  }

  getDashboardRecords() {
    this.inputData = this.bankersCheque + "," + this.demandDraft;
    this.apiService.getDashboardDataNew(this.tellerId)
      .subscribe(data => {
        console.log("data:::", data); 
        if (data.tillInfo != null) {
          let tillInfo = data.tillInfo;

          this.currencyList = tillInfo.currencyList;
          this.currencyInfo = tillInfo.currencyInfo;

          console.log(this.currencyList);
        }
        this.transactionData = data.totalTransactions;
        this.tillCount = data.currentTillPosition;
        this.DraftData = data.demandDraft;
        this.bankersChequedata = data.bankersCheque;
        this.transactionDataArr = data.recentTransactions;

        for (let i = 0; i < this.currencyInfo.length; i++) {
          if (this.currencyInfo[i].currency == "INR") {
            this.countofINR = this.currencyInfo[i].totalValue;
          }
          if (this.currencyInfo[i].currency == "USD") {
            this.countofUSD = this.currencyInfo[i].totalValue;
          }
          if (this.currencyInfo[i].currency == "AED") {
            this.countofAED = this.currencyInfo[i].totalValue;
          }
        }
      });
  }
}
