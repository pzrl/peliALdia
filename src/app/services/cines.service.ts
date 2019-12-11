import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/theaters/';
  }

  getCine(pId): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl + pId).toPromise();
  }

  getOpiniones(pId, pToken): Promise<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        idtheater: pId,
        usertoken: pToken
      })
    };
    console.log(httpOptions.headers)
    return this.http.get<any[]>(this.baseUrl + 'opiniones', httpOptions).toPromise();
  }

  getDatosCineUsuario(pUsuario, pCine): Promise<any> {
    const body = {
      idCine: pCine
    };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pUsuario
      })
    };
    return this.http.post(this.baseUrl + 'userTheaterData', body, httpOptions).toPromise();
  }

  marcarCine(pFavorito): Promise<any> {
    const body = {
      idCine: pFavorito.idCine,
      favorito: pFavorito.favorito
    };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pFavorito.idUsuario
      })
    };
    return this.http.post(this.baseUrl + 'favorite', body, httpOptions).toPromise();
  }

  getCinesFavoritos(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any>(this.baseUrl + 'cinesFavoritos', httpOptions).toPromise();
  }

}
