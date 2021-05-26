import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forex-transaction',
  templateUrl: './forex-transaction.page.html',
  styleUrls: ['./forex-transaction.page.scss'],
})
export class ForexTransactionPage implements OnInit {
  flag = true;
  users=['789045667','8789977889'];
  negotiated=['0.98','78.90'];
  constructor() {}

  ngOnInit() {}
  next() {
    this.flag = false;
  }
  previous()
  {
    this.flag=true;
  }
}
