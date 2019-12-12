import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-mis-peliculas',
  templateUrl: './mis-peliculas.component.html',
  styleUrls: ['./mis-peliculas.component.css']
})
export class MisPeliculasComponent implements OnInit {

  arrPeliculasVistas: [];
  arrPeliculasPendientes: [];


  constructor(private peliculasService: PeliculasService) { }

  async ngOnInit() {
    await this.peliculasService.getPeliculasVistas(localStorage.token_peliALdia)
      .then(result => this.arrPeliculasVistas = result)
      .catch(err => console.log(err));

    await this.peliculasService.getPeliculasPendientes(localStorage.token_peliALdia)
      .then(result => this.arrPeliculasPendientes = result)
      .catch(err => console.log(err));
  }

  onChange(pChange) {
    console.log('UN PUTO CHANGE', pChange)
  }

}
