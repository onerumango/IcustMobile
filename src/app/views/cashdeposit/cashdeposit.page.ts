import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cashdeposit',
  templateUrl: './cashdeposit.page.html',
  styleUrls: ['./cashdeposit.page.scss'],
})
export class CashdepositPage implements OnInit {
  cashDeposit : any = 'Cash Deposit';
  constructor() { }

  ngOnInit() {
  }

}
