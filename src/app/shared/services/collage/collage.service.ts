import { Injectable, Injector } from '@angular/core';
import { BaseComponent } from '../../components/base.component';
import { collage } from '../../model/collage';

@Injectable({
  providedIn: 'root',
})
export class CollageService extends BaseComponent {
  constructor(injector: Injector) {
    super(injector);
  }
  getAllCollages() {
    return this.HttpClient.get<any>(this.url + '/api/Collage');
  }

  deleteCollage(collageId: any) {
    return this.HttpClient.delete<any>(this.url + `/api/Collage/${collageId}`);
  }

  addCollage(collage: any) {
    return this.HttpClient.post<any>(this.url + '/api/Collage', collage);
  }

  editCollage(collageId: any, collage: any) {
    return this.HttpClient.put<any>(this.url + `/api/Collage/${collageId}`, collage);
  }

  checkCollage(collage: collage){
    return this.HttpClient.post<any>(this.url + '/api/Collage/CheckIfExist', collage);
  }
}
