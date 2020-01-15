import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-mis-peliculas',
  templateUrl: './mis-peliculas.component.html',
  styleUrls: ['./mis-peliculas.component.css']
})
export class MisPeliculasComponent implements OnInit {

  token: string;
  sinVistas: boolean;
  arrPeliculasVistas: [];
  sinPendientes: boolean;
  arrPeliculasPendientes: [];
  pendientes: boolean;
  vistas: boolean;

  numPelisVistas: number;
  numPelisPendientes: number;

  pelisVistasIncompleto: boolean;
  pelisPendientesIncompleto: boolean;

  pelisVistasMostradas: [];
  pelisPendientesMostradas: [];


  constructor(private peliculasService: PeliculasService) {
    this.token = localStorage.token_peliALdia;
  }

  async ngOnInit() {
    this.pendientes = false;
    this.vistas = true;

    // PELÍCULAS VISTAS
    this.arrPeliculasVistas = await this.peliculasService.getPeliculasVistas(this.token)
    this.numPelisVistas = 10;

    if (this.arrPeliculasVistas.length === 0) {
      this.sinVistas = true;
    }
    else {
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

    // PELÍCULAS PENDIENTES
    this.arrPeliculasPendientes = await this.peliculasService.getPeliculasPendientes(this.token)
    this.numPelisPendientes = 10;

    if (this.arrPeliculasPendientes.length === 0) {
      this.sinPendientes = true;
    }
    else {
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

  }

  onClickV() {
    this.vistas = true;
    this.pendientes = false;
    document.getElementById('btnVistas').className = '';
    document.getElementById('btnPendientes').className = 'inactivo';
  }
  onClickP() {
    this.vistas = false;
    this.pendientes = true;
    document.getElementById('btnPendientes').className = '';
    document.getElementById('btnVistas').className = 'inactivo';
  }

  onChange(pNota, pIdPelicula) {
    const datosPunt = {
      idUsuario: this.token,
      idPelicula: pIdPelicula,
      puntuacion: pNota
    }
    this.peliculasService.puntuarPelicula(datosPunt)
  }

  onClick(pId) {
    const peliculaPendiente = {
      idPelicula: pId,
      idUsuario: this.token,
      pendiente: 0
    };
    this.peliculasService.marcarPelicula(peliculaPendiente)
      .then(res => {
        document.getElementById(pId).style.display = 'none';
      });
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
