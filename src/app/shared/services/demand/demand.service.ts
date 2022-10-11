import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Injectable({
  providedIn: 'root',
})
export class DemandService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllDemands() {
    return this.HttpClient.get<any>(this.url + '/api/Demand');
  }

  deleteDemand(demandId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/Demand/${demandId}`);
  }

  addDemand(demand: any) {
    return this.HttpClient.post<any>(this.url + '/api/Demand', demand);
  }

  editDemand(demandId: any, demand: any) {
    return this.HttpClient.put<any>(this.url + `/api/Demand/?id=${demandId}`, demand);
  }

  getSearchDemand(options: any) {
    return this.HttpClient.post<any>(this.url + '/api/Demand/Search', options);
  }
  
}
