import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/searchs/';
  }

  getBusquedas(pConsulta): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl + pConsulta).toPromise();
  }

}
