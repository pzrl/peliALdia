import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {

  consulta: string;
  peliculas: boolean;
  usuarios: boolean;
  cines: boolean;

  peliculasIncompleto: boolean;
  usuariosIncompleto: boolean;
  cinesIncompleto: boolean;

  arrBusqueda: any[];
  numPeliculas: number;
  numUsuarios: number;
  numCines: number;

  peliculasMostradas: any;
  usuariosMostrados: any;
  cinesMostrados: any;

  peliculasNoEncontradas: boolean;
  usuariosNoEncontrados: boolean;
  cinesNoEncontrados: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.consulta = params.consulta;
      this.busquedasService.getBusquedas(this.consulta)
        .then(res => {
          this.numPeliculas = 10;
          this.numUsuarios = 10;
          this.numCines = 10;
          this.arrBusqueda = res;
          this.peliculas = true;
          this.usuarios = false;
          this.cines = false;
          // PELICULAS
          if (this.arrBusqueda[0].length === 0) {
            this.peliculasNoEncontradas = true;
          } else {
            this.peliculasMostradas = [];
            for (let i = 0; i < this.numPeliculas && i < this.arrBusqueda[0].length; i++) {
              this.peliculasMostradas.push(this.arrBusqueda[0][i]);
            }
            if (this.arrBusqueda[0].length == this.peliculasMostradas.length) {
              this.peliculasIncompleto = false;
            } else {
              this.peliculasIncompleto = true;
            }
          }
          // USUAURIOS
          if (this.arrBusqueda[1].length === 0) {
            this.usuariosNoEncontrados = true;
          } else {
            this.usuariosMostrados = [];
            for (let i = 0; i < this.numUsuarios && i < this.arrBusqueda[1].length; i++) {
              this.usuariosMostrados.push(this.arrBusqueda[1][i]);
            }
            if (this.arrBusqueda[1].length == this.usuariosMostrados.length) {
              this.usuariosIncompleto = false;
            } else {
              this.usuariosIncompleto = true;
            }
          }
          // CINES
          if (this.arrBusqueda[2].length === 0) {
            this.cinesNoEncontrados = true;
          } else {
            this.cinesMostrados = [];
            for (let i = 0; i < this.numCines && i < this.arrBusqueda[2].length; i++) {
              this.cinesMostrados.push(this.arrBusqueda[2][i]);
            }
            if (this.arrBusqueda[2].length == this.cinesMostrados.length) {
              this.cinesIncompleto = false;
            } else {
              this.cinesIncompleto = true;
            }
          }

        });
    });
  }

  ngOnInit() { }


  onClick(pCampo) {
    if (pCampo === 1) {
      this.peliculas = true;
      this.usuarios = false;
      this.cines = false;
      document.getElementById('btnPeliculas').className = '';
      document.getElementById('btnUsuarios').className = 'inactivo';
      document.getElementById('btnCines').className = 'inactivo';
    } else if (pCampo === 2) {
      this.peliculas = false;
      this.usuarios = true;
      this.cines = false;
      document.getElementById('btnPeliculas').className = 'inactivo';
      document.getElementById('btnUsuarios').className = '';
      document.getElementById('btnCines').className = 'inactivo';
    } else if (pCampo === 3) {
      this.peliculas = false;
      this.usuarios = false;
      this.cines = true;
      document.getElementById('btnPeliculas').className = 'inactivo';
      document.getElementById('btnUsuarios').className = 'inactivo';
      document.getElementById('btnCines').className = '';
    }
  }

  cargarMas(pCategoria) {
    if (pCategoria === 'peliculas') {
      this.numPeliculas = this.numPeliculas + 10;

      this.peliculasMostradas = [];
      for (let i = 0; i < this.numPeliculas && i < this.arrBusqueda[0].length; i++) {
        this.peliculasMostradas.push(this.arrBusqueda[0][i]);
      }

      if (this.arrBusqueda[0].length == this.peliculasMostradas.length) {
        this.peliculasIncompleto = false;
      } else {
        this.peliculasIncompleto = true;
      }
    }
    else if (pCategoria === 'usuarios') {
      this.numUsuarios = this.numUsuarios + 10;
      this.usuariosMostrados = [];
      for (let i = 0; i < this.numUsuarios && i < this.arrBusqueda[1].length; i++) {
        this.usuariosMostrados.push(this.arrBusqueda[1][i]);
      }
      if (this.arrBusqueda[1].length == this.usuariosMostrados.length) {
        this.usuariosIncompleto = false;
      } else {
        this.usuariosIncompleto = true;
      }
    }
    else if (pCategoria === 'cines') {
      this.numCines = this.numCines + 10;
      this.cinesMostrados = [];
      for (let i = 0; i < this.numCines && i < this.arrBusqueda[2].length; i++) {
        this.cinesMostrados.push(this.arrBusqueda[2][i]);
      }
      if (this.arrBusqueda[2].length == this.cinesMostrados.length) {
        this.cinesIncompleto = false;
      } else {
        this.cinesIncompleto = true;
      }
    }
  }

}
