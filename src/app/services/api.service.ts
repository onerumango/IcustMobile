import { Injectable } from '@angular/core';
import { AppConstants } from 'src/config/app.constant';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
    console.log("cashDepositSave----------", data)
    return this.http.post<any>(`${API_URL}/cash-deposit/api`, data).pipe(catchError(this.errorHandler));
  }
  chequeWithdrawalSave(data: object) {
    console.log("enter inside api")
    return this.http.post<any>(`${API_URL}/cheque-withdrawal`, data).pipe(catchError(this.errorHandler));
  }
  chequeDepositSave(data: object) {
    return this.http.post<any>(`${API_URL}/cheque-deposit/api`, data).pipe(catchError(this.errorHandler));
  }

  getBranchByCity(city: string) {
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

  fetchWalletInfo(customerId:any) {
    return this.http.get(`${API_URL}/cash-deposit/api/fetchWalletInfo?customerId=${customerId}`);
  }

  updateAddToWallet(model: any) {
    return this.http.put(`${API_URL}/cash-deposit/api/updateAddToWallet`, model);
  }

  saveAccount(data) {
    return this.http.post(`${API_URL}/customerdata/upsertCustomerDetails`, data,);
  }
  getLoanInfo(phoneNumber) {
    return this.http.get<any>(`${API_URL}/customerdata/getPhoneNo/${phoneNumber}`)
  }

  getCurrencyValues() {
    return this.http.get(`${API_URL}/currency`).pipe(catchError(this.errorHandler));
  }
  gettingAvailableSlots(selectedDate) {
    console.log(selectedDate);
    return this.http.get<any>(`${API_URL}/rest/data/customer/availableslots?scheduledDate=${selectedDate}`).pipe(catchError(this.errorHandler));
  }

  getDashboardDataNew(customerId: any) {
    return this.http.get<any>(`${API_URL}/teller-service/api/mobile/${customerId}`).pipe(catchError(this.errorHandler));
  }

  getTransactionByAccountId(accountId: any, page, formattedFromDate, formattedToDate, size) {
    var params;
    if ((accountId != null || accountId != '' || accountId.length != 0) && page == 0) {
      console.log('only accountId')
      if (formattedFromDate != null && formattedToDate != null) {
        params = new HttpParams()
          .append('accountNumber', accountId)
          .append('fromDate', formattedFromDate)
          .append('toDate', formattedToDate);
      } else {
        if (size > 20) {
          params = new HttpParams()
            .append('accountNumber', accountId)
            .append('size', size);
        } else {
          params = new HttpParams()
            .append('accountNumber', accountId);
        }
      }
    } else {
      console.log('accountId and page')

      if (formattedFromDate != null && formattedToDate != null) {
        params = new HttpParams()
          .append('accountNumber', accountId)
          .append('page', page)
          .append('fromDate', formattedFromDate)
          .append('toDate', formattedToDate);
      } else {
        if (size > 20) {
          params = new HttpParams()
            .append('accountNumber', accountId)
            .append('page', page)
            .append('size', size);
        } else {
          params = new HttpParams()
            .append('accountNumber', accountId)
            .append('page', page);
        }
      }
    }
    return this.http.get<any>(`${API_URL}/cash-deposit/api/fetchTransaction?${params}`).pipe(catchError(this.errorHandler));
  }

  getByTransactionId(transId: number) {
    return this.http.get<any>(`${API_URL}/cash-deposit/api/fetchByTransId/${transId}`).pipe(catchError(this.errorHandler));
  }

  uploadProfilePicture(data) {
    return this.http.post(`${API_URL}/rest/upload/uploadDoc`, data, {
      reportProgress: true,
      observe: "events"
    });
  }
  getNumberOfCrowd(tokenBranch: any) {
    return this.http.get<any>(`${API_URL}/token/api/fetchTokenCountByBranch?tokenBranch=${tokenBranch}`).pipe(catchError(this.errorHandler));
  }
  private firstTimeLogin = new BehaviorSubject<any>({
    firstTimeLogin: '',
  })
  setFirstTimeLogin(firstTimeLogin: any) {
    this.Index.next(firstTimeLogin);
  }

  getFirstTimeLogin() {
    return this.firstTimeLogin.asObservable();
  }

  validatePassword(phoneNumber:any,password: any) {
  var  params = new HttpParams()
    .append('phoneNumber', phoneNumber)
    .append('password', password);
    return this.http.get<any>(`${API_URL}/customerdata/validateCutomerPassword?${params}`).pipe(catchError(this.errorHandler));
  }

  updateCustomerPassword(model: any) {
    return this.http.put<any>(`${API_URL}/customerdata/updateCustomerPassword`, model);
  }
}


