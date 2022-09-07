import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DemandService {
  url: string = 'https://localhost:7183';
  constructor(private http: HttpClient) {}

  getAllDemands() {
    return this.http.get<any>(this.url + '/api/Demand');
  }

  logIn(account: any) {
    return this.http.post<any>(this.url + '/api/User/login', account);
  }

  deleteAccount(accountId: any) {
    return this.http.delete<any>(this.url + `/api/User/${accountId}`);
  }

  addAccount(account: any) {
    return this.http.post<any>(this.url + '/api/User', account);
  }

  editAccount(accountId: any, account: any) {
    return this.http.put<any>(this.url + `/api/User/?id=${accountId}`, account);
  }
}
