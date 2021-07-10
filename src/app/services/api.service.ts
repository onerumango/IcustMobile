import { Injectable } from '@angular/core';
import { AppConstants } from 'src/config/app.constant';
import { HttpClient } from '@angular/common/http';
export const API_URL = AppConstants.baseURL;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  cashWithdrawalSave(data:object)
{
  console.log("enter inside api")
  return this.http.post<any>(`${API_URL}/cash-withdrawal-service`,data);
}
cashDepositSave(data:object)
{
  return this.http.post<any>(`${API_URL}/cash-deposit/api`,data);
}
chequeWithdrawalSave(data:object)
{
  console.log("enter inside api")
  return this.http.post<any>(`${API_URL}/cheque-withdrawal`,data);
}
chequeDepositSave(data:object)
{
  return this.http.post<any>(`${API_URL}/cheque-deposit/api`,data);
}

}
