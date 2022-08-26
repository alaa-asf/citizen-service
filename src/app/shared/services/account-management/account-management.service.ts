import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class accountManagementService {
  url: string = 'https://localhost:7183';
  constructor(private http: HttpClient) {}
  
  getAllAccount() {
    return this.http.get<any>(this.url + '/api/User');
  }

  getAccount() {
    return this.http.get<any>(this.url + '/api/User');
  } 

  logIn(account: any) {
    return this.http.post<any>(this.url + '/api/User/login', account);
  }

  /** Trigger to delete account phone_number */
  deleteAccount(accountId: any) {
    return this.http.delete<any>(this.url + `?id=${accountId}`);
  }

  /** Trigger to add account  */
  addAccount(account: any) {
    return this.http.post(this.url + '/add_account', account);
  }
}
