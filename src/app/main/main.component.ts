import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { CinesService } from '../services/cines.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  token: string;
  posicion: any;

  vistasVacio: boolean;
  arrPeliculasVistas: [];
  arrPelisVistasMostradas: [];
  numPeliculasVistas: number;
  vistasIncompleto: boolean;

  cineCercano: any;
  idCineCercano: number;
  sinFavoritos: boolean;
  arrCinesFavoritos: [];
  arrCartelera: [];

  arrProximosEstrenos: [];
  arrEstrenosMostrados: [];
  numProximosEstrenos: number;
  proximosEstrenosIncompleto: boolean;

  constructor(
    private peliculasService: PeliculasService,
    private cinesService: CinesService
  ) {
    this.token = localStorage.token_peliALdia;
  }

  async ngOnInit() {
    this.numPeliculasVistas = 25;
    this.numProximosEstrenos = 25;

    navigator.geolocation.getCurrentPosition(async (position) => {
      this.cineCercano = await this.cinesService.getCineCercano(position);
      this.idCineCercano = this.cineCercano.id;
    });


    // PELÍCULAS VISTAS
    this.arrPeliculasVistas = await this.peliculasService.getPeliculasVistas(this.token)
    if (this.arrPeliculasVistas.length === 0) {
      this.vistasVacio = true
    } else {
      this.vistasVacio = false;
      this.arrPelisVistasMostradas = [];
      for (let i = 0; i < this.numProximosEstrenos && i < this.arrPeliculasVistas.length; i++) {
        this.arrPelisVistasMostradas.push(this.arrPeliculasVistas[i]);
      }
      if (this.arrPeliculasVistas.length == this.arrPelisVistasMostradas.length) {
        this.proximosEstrenosIncompleto = false;
      } else {
        this.proximosEstrenosIncompleto = true;
      }
    }

    // PRÓXIMOS ESTRENOS
    this.arrProximosEstrenos = await this.peliculasService.getProximosEstrenos(this.token)
    this.arrEstrenosMostrados = [];
    for (let i = 0; i < this.numPeliculasVistas && i < this.arrProximosEstrenos.length; i++) {
      this.arrEstrenosMostrados.push(this.arrProximosEstrenos[i]);
    }
    if (this.arrPeliculasVistas.length == this.arrPelisVistasMostradas.length) {
      this.vistasIncompleto = false;
    } else {
      this.vistasIncompleto = true;
    }

    // CINES FAVORITOS
    this.arrCinesFavoritos = await this.cinesService.getCinesFavoritos(this.token);
    if (this.arrCinesFavoritos.length === 0) {
      this.sinFavoritos = true;
    }
    else {
      this.sinFavoritos = false;
    }

    // CARTELERA
    this.arrCartelera = await this.cinesService.getPeliculasCine(this.token, this.idCineCercano);
  }

  onChange(pCine) {
    this.cinesService.getPeliculasCine(this.token, pCine)
      .then(result => this.arrCartelera = result)
      .catch(err => console.log(err));
  }

  onSubmit(pIdPelicula) {
    this.peliculasService.ocultarEstreno(this.token, pIdPelicula);
    document.getElementById(pIdPelicula).style.display = 'none';
  }

  cargarMas(pCategoria) {
    if (pCategoria == 'vistas') {
      this.numPeliculasVistas = this.numPeliculasVistas + 10;
      this.arrPelisVistasMostradas = [];
      for (let i = 0; i < this.numPeliculasVistas && i < this.arrPeliculasVistas.length; i++) {
        this.arrPelisVistasMostradas.push(this.arrPeliculasVistas[i]);
      }
      if (this.arrPeliculasVistas.length == this.arrPelisVistasMostradas.length) {
        this.vistasIncompleto = false;
      } else {
        this.vistasIncompleto = true;
      }
    }

    else if (pCategoria == 'estrenos') {
      this.numProximosEstrenos = this.numProximosEstrenos + 10;
      this.arrEstrenosMostrados = [];
      for (let i = 0; i < this.numProximosEstrenos && i < this.arrProximosEstrenos.length; i++) {
        this.arrEstrenosMostrados.push(this.arrProximosEstrenos[i]);
      }
      if (this.arrProximosEstrenos.length == this.arrEstrenosMostrados.length) {
        this.proximosEstrenosIncompleto = false;
      } else {
        this.proximosEstrenosIncompleto = true;
      }
    }
  }

}
