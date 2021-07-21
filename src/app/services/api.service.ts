import { Injectable } from '@angular/core';
import { AppConstants } from 'src/config/app.constant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ShowMessageService } from './showMessage/show-message.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


// export const API_URL1 = 'http://localhost:1212';
export const API_URL = AppConstants.baseURL;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private showMessageService: ShowMessageService) { }

  //Error Handler
  private errorHandler = (errorResp: HttpErrorResponse) => {
    console.error('Error : ' + errorResp.message);
    console.error('status : ' + errorResp.status);
    this.showMessageService.errorMessage(errorResp.status, errorResp);
    return throwError(errorResp.message);
  }
  getOtp(data) {
    return this.http.post<any>(`${API_URL}/rest/otp/generateOtp`, data).pipe(catchError(this.errorHandler));
  }
  verifyOtp(data) {
    return this.http.put<any>(`${API_URL}/rest/otp/validateOtp`, data).pipe(catchError(this.errorHandler));
  }
  cashWithdrawalSave(data: object) {
    console.log("enter inside api")
    return this.http.post<any>(`${API_URL}/cash-withdrawal-service`, data).pipe(catchError(this.errorHandler));
  }
  cashDepositSave(data: object) {
    return this.http.post<any>(`${API_URL}/cash-deposit/api`, data).pipe(catchError(this.errorHandler));
  }
  chequeWithdrawalSave(data: object) {
    console.log("enter inside api")
    return this.http.post<any>(`${API_URL}/cheque-withdrawal`, data).pipe(catchError(this.errorHandler));
  }
  chequeDepositSave(data: object) {
    return this.http.post<any>(`${API_URL}/cheque-deposit/api`, data).pipe(catchError(this.errorHandler));
  }

  custpomerDetails(phoneNo: String) {
    return this.http.get<any>(`${API_URL}/customerdata/getPhoneNo/${phoneNo}`).pipe(catchError(this.errorHandler));
  }

  accountDropDown(custId: String) {
    return this.http.get<any>(`${API_URL}/accountdata/account/${custId}`).pipe(catchError(this.errorHandler));
  }
  accountBalance(accId: String) {
    return this.http.get<any>(`${API_URL}/accountdata/accountBalance/${accId}`).pipe(catchError(this.errorHandler));
  }

  getBranches(city:string){
    return this.http.get<any>(`${API_URL}/branch/fetchbranch/${city}`).pipe(catchError(this.errorHandler));
  }
}
