import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  idPelicula: number;
  pelicula: any;
  token: string;
  puntuacion: any;
  pendiente: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.token = localStorage.getItem('token_peliALdia');
    this.idPelicula = this.activatedRoute.params['_value'].idItem;

    await this.peliculasService.getPelicula(this.idPelicula)
      .then(res => this.pelicula = res)
      .catch(err => console.log(err));

    await this.peliculasService.getDatosPeliUsuario(this.idPelicula, this.token)
      .then(res => {
        console.log('los datos del init', res)
        this.puntuacion = res[0].puntuacion;
        if (res[0].pendiente === 0) {
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
    }
    this.peliculasService.puntuarPelicula(datosPunt)
      .then(res => {
        console.log('Nota cambiada', res);
      })
      .catch(err => {
        console.log('Error en component', err);
      });
  }

  onClick(pPendiente) {
    const peliculaPendiente = {
      idPelicula: this.idPelicula,
      idUsuario: this.token,
      pendiente: pPendiente
    };
    this.peliculasService.marcarPelicula(peliculaPendiente)
      .then(res => {
        if (pPendiente === 0) {
          this.pendiente = false;
        } else {
          this.pendiente = true;
        }
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['pelicula/' + this.idPelicula]));
      })
      .catch(err => {
        console.log('Error en component', err);
      });
  }
}

