import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseUrl: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/users/';
  }

  checkLogin(pLogin): Promise<any> {
    return this.http.post<any>(this.baseUrl + 'login', pLogin).toPromise();
  }

  getAmigos(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any>(this.baseUrl + 'amigos', httpOptions).toPromise();
  }

  getAmigosDeAmigo(pId): Promise<any> {
    const body = {
      idAmigo: pId
    };
    return this.http.post<any>(this.baseUrl + 'amigosDeAmigo', body).toPromise();
  }

  getBloqueados(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any>(this.baseUrl + 'bloqueados', httpOptions).toPromise();
  }

  guardarUsuario(pNuevoUsuario): Promise<any> {
    return this.http.post(this.baseUrl + 'new', pNuevoUsuario).toPromise();
  }

  actualizarPerfil(pPerfil, pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    const body = {
      avatar: pPerfil.avatar,
      cita: pPerfil.cita
    };
    return this.http.post(this.baseUrl + 'updateUser', body, httpOptions).toPromise();
  }

  getUsuarioById(pId, pToken): Promise<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any[]>(this.baseUrl + pId, httpOptions).toPromise();
  }

  getAvatares(): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'avatares').toPromise()
  }

  checkToken(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any>(this.baseUrl + 'token/', httpOptions).toPromise();
  }

  getMainUser(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any>(this.baseUrl + 'mainUser/', httpOptions).toPromise();
  }

  followUser(pToken, body): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'follow/', body, httpOptions).toPromise();
  }

  blockUser(pToken, body): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'block/', body, httpOptions).toPromise();
  }

  getDatosUsuarioUsuario(pId, pToken): Promise<any> {
    const body = { amigo: pId };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'userData/', body, httpOptions).toPromise();
  }

}

