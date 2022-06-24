import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { WalletPopupComponent } from '../wallet-popup/wallet-popup.component';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.scss'],
})
export class WalletListComponent implements OnInit {
  walletList: any = [];
  currentUser: any;

  constructor(private location: Location,
    private apiService: ApiService,
    public modalController: ModalController) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('customer_details'));

    console.log("USer", this.currentUser);


    this.getSavedWalletByCustomerId();
  }


  // Fetch List of Wallet Items
  getSavedWalletByCustomerId() {
    console.log("USer", this.currentUser['customerId']);
    this.apiService.fetchWalletInfo(this.currentUser['customerId'])
      .subscribe((result: any) => {
        if (result.status == 200) {
          this.walletList = result.data;
          console.log("Wallet items", result);
        } else {
          this.walletList = [];
        }
      }, (err: any) => {
        console.error(err);
      })
  }

  async openTicketModal(data: any) {
    if (data != null) {
      const modal = await this.modalController.create({
        component: WalletPopupComponent,
        componentProps: {
          data: data ? data : {}
        }
      });
      modal.onDidDismiss().then((modelData) => {
        if (modelData) {
          console.log('Modal Data : ',modelData);
        }
      });
      return await modal.present();
    }
  }


  back() {
    this.location.back();
  }

}
