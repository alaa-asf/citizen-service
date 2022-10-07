import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';
import { postalReporter } from '../../model/postalReporter';

@Injectable({
  providedIn: 'root'
})
export class PostalReporterService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllReporter() {
    return this.HttpClient.get<postalReporter>(this.url + '/api/PostalReporter');
  }

  deleteReporter(reporterId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/PostalReporter/${reporterId}`);
  }

  addReporter(reporter: postalReporter) {
    return this.HttpClient.post<any>(this.url + '/api/PostalReporter', reporter);
  }

  editReporter(reporterId: any, reporter: postalReporter) {
    return this.HttpClient.put<any>(this.url + `/api/PostalReporter/${reporterId}`, reporter);
  }

  checkReporter(reporter: postalReporter){
    return this.HttpClient.post<any>(this.url + '/api/PostalReporter/CheckIfExist', reporter);
  }
}
