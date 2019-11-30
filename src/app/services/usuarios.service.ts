import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/users/';
  }

  checkLogin(pLogin): Promise<any> {
    console.log(pLogin)
    return this.http.post<any>(this.baseUrl + 'login', pLogin).toPromise();
  }

  guardarUsuario(pNuevoUsuario): Promise<any> {
    return this.http.post(this.baseUrl + 'new', pNuevoUsuario).toPromise();
  }

  getUsuario(pId): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl + pId).toPromise();
  }

  /*  getAll() {
   return this.http.post(this.baseUrl, {}).toPromise();
  } */

}

