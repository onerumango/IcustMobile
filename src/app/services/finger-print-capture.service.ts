import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ShowMessageService } from './showMessage/show-message.service';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { AppConstants } from 'src/config/app.constant';
export const API_URL = AppConstants.baseURL;
@Injectable({
  providedIn: 'root'
})
export class FingerPrintCaptureService {

 
  constructor(private http: HttpClient,private toastCtrl: ToastController) {
  }

  userData: BehaviorSubject<any> = new BehaviorSubject<any>('');
  userDataService(data: any) {
    this.userData.next(data);
  }

  /* NOTE:
  biometric call type: webapi
  lisence: used 60 free trail version
  desc: currently using this service for finger print capturing
   */
  CallingSGIFPGetData(): Observable<any> {
    return this.http.get('http://localhost:8000/SGIFPCapture')
      .pipe(
        tap((result) => {
          console.log('result-->', result)
          return result;
        })
      );

  }
  handleError(arg0: string, arg1: undefined[]): (err: any, caught: Observable<any>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }


  /* NOTE:
  biometric call type: registered device service
  lisence: paid
  desc: currently not using this service
   */
  rdservice() {
    var port;
    var urlStr = '';
    urlStr = 'http://localhost:11100/';

    this.getJSON_rd(urlStr,
      function (err, data) {
        if (err != null) {
          alert('Something went wrong: ' + err);
        } else {
          alert('Response:-' + String(data));
        }
      }
    );
  }
  getJSON_rd: any = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('RDSERVICE', url, true);
    xhr.responseType = 'text';
    xhr.onload = function () {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
  };

  saveBiometric(capFingerPrint, fingerName, cId, screen) {
    return this.http.post<any>(`${API_URL}/rest/upload/saveOrUpdateBio/${fingerName}/${cId}/${screen}`, capFingerPrint);
  }

  errorCodeService(errorCode) {
    var error = '';
    if (errorCode == 1) {
      error = 'Creation failed : A driver is missing/not correctly configured';
    }

    if (errorCode == 3) {
      error = 'Please check again. Either driver is corrupted or Device is not connected';
    }
    if (errorCode == 2) {
      error = 'Function failed ';
    }

    if (errorCode == 51) {
      error = 'System file load failure';
    }
    if (errorCode == 52) {
      error = 'Sensor chip initialization failed';
    }
    if (errorCode == 53) {
      error = 'Sensor line dropped';
    }

    if (errorCode == 54) {
      error = 'Timeout/Failed to scan. Clean your fingers and try again';
    }

    if (errorCode == 103 || errorCode == 104 || errorCode == 106) {
      error = 'Match failed , try again'
    }

    console.log('error :: ', error);
    this.openToast(`${error}`);
  }

  getCustInfoByFp(page, size, fingerIndex) {
    var params;

    console.log(`fingerIndex ${fingerIndex} and page ${page}`)
    params = new HttpParams().append('fingerIndex', fingerIndex);//.append('page', page);

    return this.http.get<any>(`${API_URL}/rest/upload/getCustomerDataByFp?${params}`);
  }

  getCustInfoByCustomerId(customerId) {
    var params;
    console.log(`customerId ${customerId}`)
    params = new HttpParams().append('customerId', customerId);
    return this.http.get<any>(`${API_URL}/rest/upload/getCustomerDataByFp?${params}`);
  }

  /* To-Do: https api capture */
  CallingSGIFPCapture(): Observable<any> {
    console.log(" in service ")
    return this.http.get('https://localhost:8443/SGIFPCapture')
      .pipe(
        tap((result) => {
          console.log('result-->', result)
          return result;
        })
      );
  }

   /* To-Do: https api capture */
   CallingSGIFPMatch(templeData1: any, templeData2: any): Observable<any> {
    var secuLicc = "ae7VmpMA9ZwEGVYVr1LMWrqjCEx+eFmya9VX0v+vNfQ=";
    var params = new HttpParams()
      .append('template1', templeData1)
      .append('template2', templeData2)
    //  .append('licstr',secuLicc);
    //  .append('licstr',secuLicc);
    // http://localhost:8000/SGIMatchScore
    return this.http.post(`https://localhost:8443/SGIMatchScore`, params)
      .pipe(
        tap((result) => {
          // console.log('result-->', result)
          return result;
        })

      );
  }

  async openToast(message) {
    const toast = await this.toastCtrl.create({
      message: `${message}`,
      duration: 5000
    });
    toast.present();
  }
}
