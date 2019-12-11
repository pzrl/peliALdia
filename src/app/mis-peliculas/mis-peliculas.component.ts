import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-mis-peliculas',
  templateUrl: './mis-peliculas.component.html',
  styleUrls: ['./mis-peliculas.component.css']
})
export class MisPeliculasComponent implements OnInit {

  arrPeliculasVistas: [];


  constructor(private peliculasService: PeliculasService) { }

  ngOnInit() {
    this.peliculasService.getPeliculasVistas(localStorage.token_peliALdia)
      .then(result => { console.log(result), this.arrPeliculasVistas = result })
      .catch(err => console.log(err));
  }

}
