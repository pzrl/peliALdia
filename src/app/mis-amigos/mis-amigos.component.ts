import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-mis-amigos',
  templateUrl: './mis-amigos.component.html',
  styleUrls: ['./mis-amigos.component.css']
})
export class MisAmigosComponent implements OnInit {

  token: string;

  amigos: boolean;
  mensajes: boolean;
  bloqueados: boolean;

  sinAmigos: boolean;
  arrAmigos: [];
  block: boolean;

  sinMensajes: boolean;
  arrMensajes: [];
  arrMensajesMostrados: [];
  numMensajesMostrados: number;
  mensajesMostradosIncompleto: boolean;

  arrBloqueados: [];

  constructor(
    private router: Router,
    private usuariosService: UsuariosService,
    private socialService: SocialService
  ) { }

  async ngOnInit() {
    this.amigos = true;
    this.mensajes = false;
    this.bloqueados = false;
    this.token = localStorage.token_peliALdia;
    this.numMensajesMostrados = 10;

    // AMIGOS
    this.arrAmigos = await this.usuariosService.getAmigos(this.token)
    if (this.arrAmigos.length === 0) {
      this.sinAmigos = true;
    }
    else {
      this.sinAmigos = false;
    }

    // MENSAJES
    this.arrMensajes = await this.socialService.getUltimosMensajes(this.token, 'misAmigos')
    this.arrMensajesMostrados = [];
    for (let i = 0; i < this.numMensajesMostrados && i < this.arrMensajes.length; i++) {
      this.arrMensajesMostrados.push(this.arrMensajes[i])
    }
    if (this.arrMensajes.length === this.arrMensajesMostrados.length) {
      this.mensajesMostradosIncompleto = false;
    }
    else {
      this.mensajesMostradosIncompleto = true;
    }

    // BLOQUEADOS
    this.arrBloqueados = await this.usuariosService.getBloqueados(this.token)
  }

  onClickFollow(pId) {
    const follow = {
      amigo: pId,
      accion: 0
    };
    this.usuariosService.followUser(this.token, follow)
      .then(res => {
        document.getElementById(pId).style.display = 'none';
      });
  }

  onClickBlock(event) {
    const block = {
      amigo: event.id,
      accion: event.value
    };
    this.usuariosService.blockUser(this.token, block)
      .then(res => {
        this.block = !this.block;
        document.getElementById(event.id).style.display = 'none';
        if (event.value == 0) {
          this.router.navigateByUrl('/in/usuario/' + event.id);
        }
      });
  }

  onClickA() {
    this.amigos = true;
    this.mensajes = false;
    this.bloqueados = false;
    document.getElementById('btnAmigos').className = '';
    document.getElementById('btnMensajes').className = 'inactivo';
    document.getElementById('btnBloqueados').className = 'inactivo';
  }

  onClickM() {
    this.amigos = false;
    this.mensajes = true;
    this.bloqueados = false;
    document.getElementById('btnAmigos').className = 'inactivo';
    document.getElementById('btnMensajes').className = '';
    document.getElementById('btnBloqueados').className = 'inactivo';
  }

  onClickB() {
    this.amigos = false;
    this.mensajes = false;
    this.bloqueados = true;
    document.getElementById('btnAmigos').className = 'inactivo';
    document.getElementById('btnMensajes').className = 'inactivo';
    document.getElementById('btnBloqueados').className = '';
  }

  cargarMas() {
    this.numMensajesMostrados += 10;
    this.arrMensajesMostrados = [];
    for (let i = 0; i < this.numMensajesMostrados && i < this.arrMensajes.length; i++) {
      this.arrMensajesMostrados.push(this.arrMensajes[i]);
    }
    if (this.arrMensajes.length === this.arrMensajesMostrados.length) {
      this.mensajesMostradosIncompleto = false;
    }
    else {
      this.mensajesMostradosIncompleto = true;
    }
  }

}
