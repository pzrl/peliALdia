import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/social/';
  }

  getPelicuasVistas(pToken): Promise<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    }
    return this.http.get<any[]>(this.baseUrl + 'seenMovies', httpOptions).toPromise();
  }

  getUltimosMensajes(pToken): Promise<any[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken
      })
    }
    return this.http.get<any[]>(this.baseUrl + 'lastMessages', httpOptions).toPromise();
  }



}
