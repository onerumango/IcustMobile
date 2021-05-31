import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chequewithdrawal',
  templateUrl: './chequewithdrawal.page.html',
  styleUrls: ['./chequewithdrawal.page.scss'],
})
export class ChequewithdrawalPage implements OnInit {
  chequeWithdrawal : any = 'Cheque Withdrawal';
  constructor() { }

  ngOnInit() {
  }

}
