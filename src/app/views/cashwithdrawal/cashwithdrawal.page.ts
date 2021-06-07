import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashwithdrawal',
  templateUrl: './cashwithdrawal.page.html',
  styleUrls: ['./cashwithdrawal.page.scss'],
})
export class CashwithdrawalPage implements OnInit {
  cashWithdrawal : any = 'Cash Withdrawal';
  constructor() { }

  ngOnInit() {
  }

}
