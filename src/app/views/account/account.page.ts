import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  flag: boolean;

  constructor(public popoverCtrl: PopoverController,public router:Router,public actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }
  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create();
  //   popover.present({
  //     ev: myEvent
  //   });
  // }
  async openActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      // subHeader: 'Subtitle',
      animated: false,
      backdropDismiss: false,
      cssClass:'my-custom-class',
      mode: 'ios',
      buttons: [ {
        text: 'Edit',
        // icon: 'share',
        handler: () => {
         this.edit();
          console.log('Share clicked');
        }
      }, {
        text: 'Share  Account Details',
        // icon: 'arrow-dropright-circle',
        handler: () => {
     
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        // icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  edit()
  {
    this.flag=true;
  }
  previous()
  {
    this.router.navigate(['/tabs/profile']);
  }
  previous1()
  {
    // this.router.navigate(['account']);
    this.flag=false;
  }
}
