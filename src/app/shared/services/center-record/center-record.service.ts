import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Injectable({
  providedIn: 'root'
})
export class CenterRecordService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllDemands() {
    return this.HttpClient.get<any>(this.url + '/api/Center_Record');
  }

  deleteAccount(demandId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/Center_Record/${demandId}`);
  }

  addDemand(demand: any) {
    return this.HttpClient.post<any>(this.url + '/api/Center_Record', demand);
  }

  editAccount(demandId: any, demand: any) {
    return this.HttpClient.put<any>(this.url + `/api/Center_Record/?id=${demandId}`, demand);
  }
  searchDeamand(demand:any){
    return this.HttpClient.post<any>(this.url + '/api/Center_Record/Search', demand);
  }
}
