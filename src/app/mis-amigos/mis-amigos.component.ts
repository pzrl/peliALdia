import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-mis-amigos',
  templateUrl: './mis-amigos.component.html',
  styleUrls: ['./mis-amigos.component.css']
})
export class MisAmigosComponent implements OnInit {

  token: string;
  arrAmigos: [];

  constructor(private usuariosService: UsuariosService) { }

  async ngOnInit() {
    this.token = localStorage.token_peliALdia;

    await this.usuariosService.getAmigos(this.token)
      .then(res => {
        console.log('los datos del user', res);
        this.arrAmigos = res;
      })
      .catch(err => {
        console.log('fukin error', err);
      })

  }

}
