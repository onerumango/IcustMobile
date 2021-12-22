import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  filterTerm: string;
  items: any = [
    {
      id: 1,
      title: "Cash Withdrawal",
      state:""
    },{
      id: 2,
      title: "Cash Deposit",
      state:""
    }, {
      id: 3,
      title: "Cheque Deposit",
      state:""
    }, {
      id: 4,
      title: "Cheque Withdrawal",
      state:""
    }, {
      id: 5,
      title: "Forex Transaction",
      state:""
    },{
      id: 6,
      title: "Bill Payment",
      state:""
    }
  ];

  trendingRecords = [{
    "id": 1,
    "name": "Account Settings",
  },
  {
    "id": 2,
    "name": "Notification",
  },
  {
    "id": 3,
    "name": "Help",
  },
  {
    "id": 4,
    "name": "Loan Payment",
    "email": "Julianne.OConner@kory.org"
  },
  {
    "id": 5,
    "name": "Recharge",
  }
]
  constructor(private modalController: ModalController,
    public toastController: ToastController) { }

  ngOnInit() { }


  async closeModel() {
    await this.modalController.dismiss(close);
  }

  async openToast(name) {
    const toast = await this.toastController.create({
      message: `${name} clicked`,
      duration: 2000
    });
    toast.present();
  }
}
