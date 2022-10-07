import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';
import { service } from '../../model/service';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }

  getAllServices(){
    return this.HttpClient.get<any>(this.url + '/api/Service');
  }

  getDocumentRequire(serviceId:any){
    return this.HttpClient.get<any>(this.url + `/api/ServiceDocumentRequired/${serviceId}`);
  }

  deleteServices(serviceId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/Service/${serviceId}`);
  }

  addService(service: any) {
    return this.HttpClient.post<any>(this.url + '/api/Service', service);
  }

  editServices(serviceId: any, service: any) {
    return this.HttpClient.put<any>(this.url + `/api/Service/${serviceId}`, service);
  }

  addDocumentRequire(DocumentRequired:any){
    return this.HttpClient.post<any>(this.url + '/api/ServiceDocumentRequired', DocumentRequired);
  }

  checkService(service: service){
    return this.HttpClient.post<any>(this.url + '/api/Service/CheckIfExist', service);
  }
}
