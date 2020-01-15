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
    return this.http.get<any[]>(this.baseUrl + 'opiniones', httpOptions).toPromise();
  }

  getDatosCine(pId): Promise<any> {
    const body = { idCine: pId };
    return this.http.post(this.baseUrl + 'theaterData', body).toPromise();
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

  puntuarCine(pNota): Promise<any> {
    const body = {
      idCine: pNota.idCine,
      puntuacion: pNota.puntuacion
    };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pNota.idUsuario
      })
    };
    return this.http.post(this.baseUrl + 'mark', body, httpOptions).toPromise();
  }

  getCineCercano(pPosition): Promise<any> {
    const posicion = {
      latitud: pPosition.coords.latitude,
      longitud: pPosition.coords.longitude
    };
    return this.http.post(this.baseUrl + 'closerTheater', posicion).toPromise();
  }

  getCinesFavoritos(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.get<any>(this.baseUrl + 'cinesFavoritos', httpOptions).toPromise();
  }

  getCinesFavoritosAmigo(pId): Promise<any> {
    const body = {
      idAmigo: pId
    };
    return this.http.post(this.baseUrl + 'cinesFavoritosAmigo', body).toPromise();
  }

  getPeliculasCine(pToken, pCine): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    const body = {
      idCine: pCine
    };
    return this.http.post(this.baseUrl + 'getTheaterSessions', body, httpOptions).toPromise();
  }


}
