import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Injectable({
  providedIn: 'root'
})
export class CollageRecordService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllDemands() {
    return this.HttpClient.get<any>(this.url + '/api/Collage_Record');
  }

  deleteAccount(demandId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/User/${demandId}`);
  }

  addDemand(demand: any) {
    return this.HttpClient.post<any>(this.url + '/api/Collage_Record', demand);
  }

  searchDeamand(demand: any) {
    return this.HttpClient.post<any>(this.url + '/api/Collage_Record/Search', demand);
  }

  editAccount(demandId: any, demand: any) {
    return this.HttpClient.put<any>(this.url + `/api/User/?id=${demandId}`, demand);
  }
}
