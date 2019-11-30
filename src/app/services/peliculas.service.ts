import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  puntuarPelicula(puntuacion) {
    console.log(puntuacion)
    return this.http.post(this.baseUrl + 'mark', puntuacion).toPromise();
  }

  marcarPelicula(peliculaPendiente): Promise<any> {
    console.log(peliculaPendiente)
    return this.http.post(this.baseUrl + 'pendiente', peliculaPendiente).toPromise();
  }



}
