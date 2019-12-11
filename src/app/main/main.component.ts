import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  arrPeliculasVistas: [];

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit() {
    this.peliculasService.getPeliculasVistas(localStorage.token_peliALdia)
      .then(result => { console.log(result), this.arrPeliculasVistas = result })
      .catch(err => console.log(err));




  }

}
