import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  url: string = 'https://localhost:7183';
  constructor(private http: HttpClient) {}
  getAllServices(){
    return this.http.get<any>(this.url + '/api/Service');
  }
}
