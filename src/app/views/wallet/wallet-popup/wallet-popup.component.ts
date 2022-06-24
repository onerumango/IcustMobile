import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wallet-popup',
  templateUrl: './wallet-popup.component.html',
  styleUrls: ['./wallet-popup.component.scss'],
})
export class WalletPopupComponent implements OnInit {
  @Input() data: string;
  constructor(private modalController: ModalController,) { }

  ngOnInit() {
    console.log(this.data)
  }

  async close() {
    await this.modalController.dismiss(true);
  }

}
