import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class studentDemandService {
  url: string = 'https://localhost:7183';
  constructor(private http: HttpClient) {}

  checkNationalID(demand: any) {
    return this.http.post<any>(this.url + '/api/Student_Demand/CheckifNationalNumberExist', demand);
  }

  addDemand(demand:any){
    return this.http.post<any>(this.url + '/api/Student_Demand', demand);
  }
}
