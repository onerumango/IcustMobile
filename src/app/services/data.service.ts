import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sendTransactionId = new BehaviorSubject({});
  getTransactionId = this.sendTransactionId.asObservable();

  constructor() { }

  shareTransactionId(params: object) {
    this.sendTransactionId.next(params)
  }


}