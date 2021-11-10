import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
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

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

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
}
