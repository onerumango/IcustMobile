import { Injectable } from '@angular/core';
import { AppConstants } from 'src/config/app.constant';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ShowMessageService } from './showMessage/show-message.service';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// export const API_URL1 = 'http://localhost:1212';
export const API_URL = AppConstants.baseURL;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  shareOtp = new BehaviorSubject<any>(null);
  getOtpToken = this.shareOtp.asObservable();

  constructor(private http: HttpClient, private showMessageService: ShowMessageService) { }

  //Error Handler
  private errorHandler = (errorResp: HttpErrorResponse) => {
    console.error('Error : ' + errorResp.message);
    console.error('status : ' + errorResp.status);
    this.showMessageService.errorMessage(errorResp.status, errorResp);
    return throwError(errorResp.message);
  }

  sendOtp(otp: any) {
    this.shareOtp.next(otp);
  }

  private Index = new BehaviorSubject<any>({
    index: '',
  })
  setIndex(index: any) {
    this.Index.next(index);
  }

  getIndex() {
    return this.Index.asObservable();
  }
  getOtp(data) {
    return this.http.post<any>(`${API_URL}/rest/otp/generateOtp`, data).pipe(catchError(this.errorHandler));
  }
  verifyOtp(data) {
    return this.http.put<any>(`${API_URL}/rest/otp/validateOtp`, data)
    // return this.http.put<any>(`${API_URL}/rest/otp/validateOtp`, data).pipe(catchError(this.errorHandler));
  }
  cashWithdrawalSave(data: object) {
    console.log("enter inside api")
    return this.http.post<any>(`${API_URL}/cash-withdrawal-service`, data).pipe(catchError(this.errorHandler));
  }
  cashDepositSave(data: object) {
    console.log("cashDepositSave----------",data)
    return this.http.post<any>(`${API_URL}/cash-deposit/api`, data).pipe(catchError(this.errorHandler));
  }
  chequeWithdrawalSave(data: object) {
    console.log("enter inside api")
    return this.http.post<any>(`${API_URL}/cheque-withdrawal`, data).pipe(catchError(this.errorHandler));
  }
  chequeDepositSave(data: object) {
    return this.http.post<any>(`${API_URL}/cheque-deposit/api`, data).pipe(catchError(this.errorHandler));
  }

  getBranchByCity(city:string){
    return this.http.get<any>(`${API_URL}/branch/fetchbranch/${city}`).pipe(catchError(this.errorHandler));
  }

  custpomerDetails(phoneNo: String) {
    return this.http.get<any>(`${API_URL}/customerdata/getPhoneNo/${phoneNo}`).pipe(catchError(this.errorHandler));
  }
  getProfileDetails(customerId: any) {
    return this.http.get<any>(`${API_URL}/customerdata/getProfileDetails?customerId=${customerId}`).pipe(catchError(this.errorHandler));
  }
  accountDropDown(custId: String) {
    return this.http.get<any>(`${API_URL}/accountdata/account/${custId}`);
  }
  accountBalance(accId: String) {
    return this.http.get<any>(`${API_URL}/accountdata/accountBalance/${accId}`);
  }
  generateQRCode(data): Observable<Blob> {
    return this.http.post(`${API_URL}/token/api/qr-code-generator`, data, { responseType: 'blob' });
    // return this.http.get<any>(`${API_URL1}/token/api/fetch-qr-code/${data}`).pipe(catchError(this.errorHandler));

  }
  getLoanInfo(phoneNumber) {
    return this.http.get<any>(`${API_URL}/customerdata/getPhoneNo/${phoneNumber}`)
  }

getCurrencyValues(){
  return this.http.get(`${API_URL}/currency`).pipe(catchError(this.errorHandler));
}

}


