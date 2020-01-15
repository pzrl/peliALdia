import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  idPelicula: number;
  pelicula: any;
  token: string;

  datosPeliUsuario: any;

  datosPelicula: any;
  puntuacion: any;
  pendiente: boolean;
  subscripcion: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.token = localStorage.getItem('token_peliALdia');

    this.subscripcion = this.activatedRoute.params.subscribe(async (params) => {
      this.idPelicula = params.idItem;

      // FICHA PELÍCULA
      this.pelicula = await this.peliculasService.getPelicula(this.idPelicula);
      if (this.pelicula == null) {
        this.router.navigateByUrl('/in/error404');
      }

      // DATOS PELÍCULA
      this.datosPelicula = await this.peliculasService.getDatosPelicula(this.idPelicula);
      if (this.datosPelicula.puntuacion === 'NaN') {
        this.datosPelicula.puntuacion = null;
      }
      if (this.datosPelicula.numeroPuntuaciones === 'NaN') {
        this.datosPelicula.numeroPuntuaciones = 0;
      }

      // RELACION PELÍCULA USUARIO
      this.datosPeliUsuario = await this.peliculasService.getDatosPeliUsuario(this.idPelicula, this.token)
      this.puntuacion = this.datosPeliUsuario[0].puntuacion;
      if (this.datosPeliUsuario[0].pendiente === 0) {
        this.pendiente = false;
      } else {
        this.pendiente = true;
      }
    });
  }

  onChange(pNota) {
    const datosPunt = {
      idUsuario: this.token,
      idPelicula: this.idPelicula,
      puntuacion: pNota
    };
    this.peliculasService.puntuarPelicula(datosPunt)
  }

  onClick(pPendiente) {
    const peliculaPendiente = {
      idPelicula: this.idPelicula,
      idUsuario: this.token,
      pendiente: pPendiente
    };
    if (pPendiente == 0) {
      this.pendiente = false;
    } else {
      this.pendiente = true;
    }
    this.peliculasService.marcarPelicula(peliculaPendiente)
  }

}

