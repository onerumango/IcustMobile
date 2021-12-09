import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sendTransactionId = new BehaviorSubject({});
  getTransactionId = this.sendTransactionId.asObservable();

  private sendAccountInfo = new BehaviorSubject({});
  getAccountInfo = this.sendAccountInfo.asObservable();

  private sendAvatarUrl = new BehaviorSubject(null);
  getAvatarUrl = this.sendAvatarUrl.asObservable();

  constructor() { }

  shareTransactionId(params: object) {
    this.sendTransactionId.next(params)
  }

  shareAccountInfo(params: object) {
    this.sendAccountInfo.next(params)
  }

  shareAvatarUrl(avatarInfo){
    this.sendAvatarUrl.next(avatarInfo);
  }

}