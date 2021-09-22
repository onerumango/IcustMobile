import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor() { }

  private subjectName = new Subject<any>(); //need to create a subject
    
  sendProfileInfo(data: any) { //the component that wants to update something, calls this fn
      this.subjectName.next({ data: data}); //next() will feed the value in Subject
  }

  getProfileInfo(): Observable<any> { //the receiver component calls this function 
      return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }
}
