import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/chats/';
  }

  getChat(pCategoria, pToken, pItem): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pToken,
      })
    };
    const body = {
      iditem: pItem,
      categoria: pCategoria
    }
    return this.http.post<any>(this.baseUrl + 'get', body, httpOptions).toPromise();
  }

  savePost(pPost): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        usertoken: pPost.token,
      })
    };
    const body = {
      iditem: pPost.idItem,
      categoria: pPost.categoria,
      post: pPost.post
    }
    return this.http.post(this.baseUrl + 'save', body, httpOptions).toPromise();
  }

  editPost(pBody): Promise<any> {
    console.log(pBody)
    return this.http.post(this.baseUrl + 'edit', pBody).toPromise();
  }

  deletePost(pBody): Promise<any> {
    return this.http.post(this.baseUrl + 'delete', pBody).toPromise();
  }

}