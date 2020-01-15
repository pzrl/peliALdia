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

  getDatosPelicula(pId): Promise<any> {
    const body = { idPelicula: pId };
    return this.http.post(this.baseUrl + 'movieData', body).toPromise();
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
    return this.http.post(this.baseUrl + 'seenMovies', { body: '' }, httpOptions).toPromise();
  }

  getPeliculasVistasAmigo(pId): Promise<any> {
    const body = {
      idAmigo: pId
    };
    return this.http.post(this.baseUrl + 'seenMoviesFriend', body).toPromise();
  }

  getPeliculasPendientes(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'toSeeMovies', { body: '' }, httpOptions).toPromise();
  }

  getPeliculasPendientesAmigo(pId): Promise<any> {
    const body = {
      idAmigo: pId
    };
    return this.http.post(this.baseUrl + 'toSeeMoviesFriend', body).toPromise();
  }

  getProximosEstrenos(pToken): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    return this.http.post(this.baseUrl + 'proximosEsternos', { body: '' }, httpOptions).toPromise();
  }

  ocultarEstreno(pToken, pIdPelicula): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    };
    const body = {
      idPelicula: pIdPelicula
    };
    return this.http.post(this.baseUrl + 'hideMovie', body, httpOptions).toPromise();
  }

  /*  cargarMasPeliculas(pCategoria): Promise<any> {
     return this.http.post(this.baseUrl + 'loadMoreMovies', pCategoria).toPromise();
   } */

}
