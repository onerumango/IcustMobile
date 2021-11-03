import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private myToast: any;

  constructor(
    private toast: ToastController
  ) { }

  showToast(msg:string) {
    this.myToast = this.toast.create({
      message: msg,
      duration: 3000
    }).then((toastData) => {
      toastData.present();
    });
  }

  dismissToast() {
    this.myToast = this.toast.dismiss();
  }

}