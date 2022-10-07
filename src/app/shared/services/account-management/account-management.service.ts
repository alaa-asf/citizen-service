import { Injectable, Injector } from '@angular/core';
import { Account } from 'src/app/shared/model/account';
import { BaseComponent } from '../../components/base.component';

@Injectable({
  providedIn: 'root',
})
export class accountManagementService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllAccount() {
    return this.HttpClient.get<any>(this.url + '/api/User');
  }

  logIn(account: any) {
    return this.HttpClient.post<any>(this.url + '/api/User/login', account);
  }

  deleteAccount(accountId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/User/${accountId}`);
  }

  addAccount(account: any) {
    return this.HttpClient.post<any>(this.url + '/api/User', account);
  }

  editAccount(accountId: any, account: any) {
    return this.HttpClient.put<any>(this.url + `/api/User/${accountId}`, account);
  }

  checkAccount(account: Account){
    return this.HttpClient.post<any>(this.url + '/api/User/CheckIfExist', account);
  }
}
