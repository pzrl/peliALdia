import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/movies/';
  }

  getPelicula(pId): Promise<any[]> {
    return this.http.get<any[]>(this.baseUrl + pId).toPromise();
  }

  getDatosPeliUsuario(pId, pToken): Promise<any> {
    const body = { idPelicula: pId };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'userData', body, httpOptions).toPromise();
  }

  puntuarPelicula(pDatosPunt) {
    const body = {
      idPelicula: pDatosPunt.idPelicula,
      puntuacion: pDatosPunt.puntuacion
    };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pDatosPunt.idUsuario
      })
    };
    return this.http.post(this.baseUrl + 'mark', body, httpOptions).toPromise();
  }

  marcarPelicula(pPendiente): Promise<any> {
    const body = {
      idPelicula: pPendiente.idPelicula,
      pendiente: pPendiente.pendiente
    };
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pPendiente.idUsuario
      })
    };
    return this.http.post(this.baseUrl + 'pendiente', body, httpOptions).toPromise();
  }

  getPeliculasVistas(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'seenMovies', { body: 'Prueba' }, httpOptions).toPromise()
  }

  cargarAPI(): Promise<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/cogerPeliculas').toPromise()
  }

}
