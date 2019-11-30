import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  id: number;
  pelicula: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.params['_value'].idPelicula;

    this.peliculasService.getPelicula(this.id)
      .then(res => {
        this.pelicula = res;
      }).catch(err => {
        console.log(err);
      });
  }

  onChange(pNota) {
    const puntuacion = {
      idUsuario: localStorage.getItem('token'), // CUANDO TENGA EL CORRECTO REVISAR JSON.parse
      idPelicula: this.id,
      puntuacion: pNota
    };
    this.peliculasService.puntuarPelicula(puntuacion)
      .then(res => {
        console.log('Nota cambiada', res);
      })
      .catch(err => {
        console.log('Error en component', err);
      });
  }

  onClick(pPendiente) {
    console.log(pPendiente)
    const peliculaPendiente = {
      idPelicula: this.id,
      idUsuario: localStorage.getItem('token'), // CUANDO TENGA EL CORRECTO REVISAR JSON.parse
      pendiente: pPendiente
    };
    this.peliculasService.marcarPelicula(peliculaPendiente)
      .then(res => {
        console.log('Añadida/Quitada en pelis pendientes', res);
      })
      .catch(err => {
        console.log('Error en component', err);
      });
  }
}

