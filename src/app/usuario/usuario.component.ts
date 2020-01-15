import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';
import { CinesService } from '../services/cines.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  id: number;
  usuario: any;
  relacion: any;
  token: string;
  follow: boolean;
  block: boolean;
  amigoBlock: boolean;

  mensajes: boolean;
  vistas: boolean;
  pendientes: boolean;
  amigos: boolean;
  cines: boolean;

  sinVistas: boolean;
  arrPeliculasVistas: [];
  numPelisVistas: number;
  pelisVistasIncompleto: boolean;
  pelisVistasMostradas: [];

  sinPendientes: boolean;
  arrPeliculasPendientes: [];
  numPelisPendientes: number;
  pelisPendientesIncompleto: boolean;
  pelisPendientesMostradas: [];

  sinAmigos: boolean;
  arrAmigos: any;
  sinCines: boolean;
  arrCines: any;

  puntuacionCine: number;
  subscripcion: Subscription;

  constructor(
    private usuariosService: UsuariosService,
    private peliculasService: PeliculasService,
    private cinesService: CinesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.mensajes = true;
    this.vistas = false;
    this.pendientes = false;
    this.amigos = false;
    this.cines = false;
    this.token = localStorage.token_peliALdia;

    this.subscripcion = this.activatedRoute.params.subscribe(async (params) => {
      this.id = params.idItem;

      // RELACIÓN USUARIO AMIGO
      this.relacion = await this.usuariosService.getDatosUsuarioUsuario(this.id, this.token)
      if (this.relacion.follow === 1) { this.follow = false }
      else { this.follow = true }
      if (this.relacion.block === 1) { this.block = false }
      else { this.block = true }
      if (this.relacion.amigoBlock === 1) { this.amigoBlock = true }
      else { this.amigoBlock = false }

      // DATOS AMIGO
      this.usuario = await this.usuariosService.getUsuarioById(this.id, this.token)
      if (this.usuario == 0) { this.router.navigateByUrl('/in/error404'); }

      if (this.usuario.puntuacionMedia === 'NaN') {
        this.usuario.puntuacionMedia = '-';
      }

      // PELICULAS VISTAS DEL AMIGO
      this.arrPeliculasVistas = await this.peliculasService.getPeliculasVistasAmigo(this.id)
      this.numPelisVistas = 10;

      if (this.arrPeliculasVistas.length === 0) {
        this.sinVistas = true;
      } else {
        this.sinVistas = false;
        this.pelisVistasMostradas = [];
        for (let i = 0; i < this.numPelisVistas && i < this.arrPeliculasVistas.length; i++) {
          this.pelisVistasMostradas.push(this.arrPeliculasVistas[i]);
        }
        if (this.arrPeliculasVistas.length == this.pelisVistasMostradas.length) {
          this.pelisVistasIncompleto = false;
        } else {
          this.pelisVistasIncompleto = true;
        }
      }

      // PELICULAS PENDIENTES DEL AMIGO
      this.arrPeliculasPendientes = await this.peliculasService.getPeliculasPendientesAmigo(this.id)
      this.numPelisPendientes = 10;

      if (this.arrPeliculasPendientes.length === 0) {
        this.sinPendientes = true;
      } else {
        this.sinPendientes = false;
        this.pelisPendientesMostradas = [];
        for (let i = 0; i < this.numPelisPendientes && i < this.arrPeliculasPendientes.length; i++) {
          this.pelisPendientesMostradas.push(this.arrPeliculasPendientes[i]);
        }
        if (this.arrPeliculasPendientes.length == this.pelisPendientesMostradas.length) {
          this.pelisPendientesIncompleto = false;
        } else {
          this.pelisPendientesIncompleto = true;
        }
      }

      // AMIGOS DEL AMIGO
      this.arrAmigos = await this.usuariosService.getAmigosDeAmigo(this.id)

      if (this.arrAmigos.length === 0) {
        this.sinAmigos = true;
      }
      else {
        this.sinAmigos = false;
      }

      // CINES FAVORITOS DEL AMIGO
      this.arrCines = await this.cinesService.getCinesFavoritosAmigo(this.id)
      if (this.arrCines.length === 0) {
        this.sinCines = true;
      }
      else {
        this.sinCines = false;
      }
    });
  }

  onClickFollow(event) {
    const follow = {
      amigo: this.id,
      accion: event
    };
    this.follow = !this.follow;
    this.usuariosService.followUser(this.token, follow)
  }

  onClickBlock(event) {
    const block = {
      amigo: this.id,
      accion: event
    };
    this.block = !this.block;
    this.usuariosService.blockUser(this.token, block)
  }

  onClickM() {
    this.mensajes = true;
    this.vistas = false;
    this.pendientes = false;
    this.amigos = false;
    this.cines = false;
    document.getElementById('btnMensajes').className = '';
    document.getElementById('btnVistas').className = 'inactivo';
    document.getElementById('btnPendientes').className = 'inactivo';
    document.getElementById('btnAmigos').className = 'inactivo';
    document.getElementById('btnCines').className = 'inactivo';
  }

  onClickV() {
    this.mensajes = false;
    this.vistas = true;
    this.pendientes = false;
    this.amigos = false;
    this.cines = false;
    document.getElementById('btnMensajes').className = 'inactivo';
    document.getElementById('btnVistas').className = '';
    document.getElementById('btnPendientes').className = 'inactivo';
    document.getElementById('btnAmigos').className = 'inactivo';
    document.getElementById('btnCines').className = 'inactivo';
  }

  onClickP() {
    this.mensajes = false;
    this.vistas = false;
    this.pendientes = true;
    this.amigos = false;
    this.cines = false;
    document.getElementById('btnMensajes').className = 'inactivo';
    document.getElementById('btnVistas').className = 'inactivo';
    document.getElementById('btnPendientes').className = '';
    document.getElementById('btnAmigos').className = 'inactivo';
    document.getElementById('btnCines').className = 'inactivo';
  }

  onClickA() {
    this.mensajes = false;
    this.vistas = false;
    this.pendientes = false;
    this.amigos = true;
    this.cines = false;
    document.getElementById('btnMensajes').className = 'inactivo';
    document.getElementById('btnVistas').className = 'inactivo';
    document.getElementById('btnPendientes').className = 'inactivo';
    document.getElementById('btnAmigos').className = '';
    document.getElementById('btnCines').className = 'inactivo';
  }

  onClickC() {
    this.mensajes = false;
    this.vistas = false;
    this.pendientes = false;
    this.amigos = false;
    this.cines = true;
    document.getElementById('btnMensajes').className = 'inactivo';
    document.getElementById('btnVistas').className = 'inactivo';
    document.getElementById('btnPendientes').className = 'inactivo';
    document.getElementById('btnAmigos').className = 'inactivo';
    document.getElementById('btnCines').className = '';
  }

  cargarMas(pCategoria) {
    if (pCategoria === 'vistas') {
      this.numPelisVistas = this.numPelisVistas + 10;

      this.pelisVistasMostradas = [];
      for (let i = 0; i < this.numPelisVistas && i < this.arrPeliculasVistas.length; i++) {
        this.pelisVistasMostradas.push(this.arrPeliculasVistas[i]);
      }
      if (this.arrPeliculasVistas.length == this.pelisVistasMostradas.length) {
        this.pelisVistasIncompleto = false;
      } else {
        this.pelisVistasIncompleto = true;
      }
    }
    if (pCategoria === 'pendientes') {
      this.numPelisPendientes = this.numPelisPendientes + 10;

      this.pelisPendientesMostradas = [];
      for (let i = 0; i < this.numPelisPendientes && i < this.arrPeliculasPendientes.length; i++) {
        this.pelisPendientesMostradas.push(this.arrPeliculasPendientes[i]);
      }
      if (this.arrPeliculasPendientes.length == this.pelisPendientesMostradas.length) {
        this.pelisPendientesIncompleto = false;
      } else {
        this.pelisPendientesIncompleto = true;
      }
    }
  }
}