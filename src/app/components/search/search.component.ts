import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  filterTerm: string;
  items: any = [];

  trendingRecords = [ {
    id: 1,
    name: "Cash Withdrawal",
    state:"/cashwithdrawal"
  },{
    id: 2,
    name: "Cash Deposit",
    state:"/cashdeposit"
  }, {
    id: 3,
    name: "Cheque Deposit",
    state:"/chequedeposit"
  }, {
    id: 4,
    name: "Cheque Withdrawal",
    state:"/chequewithdrawal"
  }, {
    id: 5,
    name: "Forex Transaction",
    state:"/forex-transaction"
  },{
    id: 6,
    name: "Loan Payment",
    state:"/loan-payment"
  }
]
  constructor(private modalController: ModalController,
    public toastController: ToastController,
    private router:Router) { }

  ngOnInit() { }


  async closeModel() {
    await this.modalController.dismiss(close);
  }

  openPage(item) {
    this.router.navigate([`${item.state}`]).then(_=>{
      this.closeModel();
    });
  }
}
