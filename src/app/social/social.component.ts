import { Component, OnInit } from '@angular/core';
import { SocialService } from '../services/social.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  token: string;
  peliculasVistas: {};
  ultimosMensajes: {};
  sinAmigos: boolean;
  sinComentarios: boolean;

  constructor(
    private socialService: SocialService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {

    this.token = localStorage.token_peliALdia;

    this.socialService.getPelicuasVistas(this.token)
      .then(res => {
        this.peliculasVistas = res;
        if (res.length === 0) { this.sinAmigos = true; }
      });

    this.socialService.getUltimosMensajes(this.token, 'social')
      .then(res => {
        this.ultimosMensajes = res;
        if (res.length === 0) { this.sinComentarios = true; }
      })
  }
} 
