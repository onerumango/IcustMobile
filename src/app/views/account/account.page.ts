import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CommonserviceService } from 'src/app/services/commonservice.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  flag: boolean;
  private subscriptionName: Subscription; 
  formData: any;
  phoneNumber: string;

  constructor(public popoverCtrl: PopoverController,
    public router:Router,
    public actionSheetController: ActionSheetController,
    private commonService:CommonserviceService,private api: ApiService, private cdr:ChangeDetectorRef) { 
    }

  ngOnInit() {
    this.phoneNumber= localStorage.getItem('PhoneNumLogin');
    this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
      console.log('backend resp in account', resp);
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      this.formData=resp;
     })
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
