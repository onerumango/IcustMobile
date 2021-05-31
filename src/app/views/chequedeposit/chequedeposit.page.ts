import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chequedeposit',
  templateUrl: './chequedeposit.page.html',
  styleUrls: ['./chequedeposit.page.scss'],
})
export class ChequedepositPage implements OnInit {
  chequeDeposit : any = 'Cheque Deposit';
  constructor() { }

  ngOnInit() {
  }

}
