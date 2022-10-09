import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Injectable({
  providedIn: 'root',
})
export class studentDemandService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  checkNationalID(demand: any) {
    return this.HttpClient.post<any>(this.url + '/api/Student_Demand/CheckifNationalNumberExist', demand);
  }

  addStudentDemand(demand:any){
    return this.HttpClient.post<any>(this.url + '/api/Student_Demand', demand);
  }

  checkUnivercityNumber(demand: any) {
    return this.HttpClient.post<any>(this.url + '/api/Student_Demand/CheckifUnivercityNumberExist', demand);
  }

  getAll(){
    return this.HttpClient.get<any>(this.url + '/api/Student_Demand');
  }
}
