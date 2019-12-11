import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {

  consulta: string;
  oculto: boolean;

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit() {
    this.oculto = false;
  }

  onClick($event) {
    this.peliculasService.cargarAPI()
      .then(res => console.log(res));
  }

  onClickPerfil() {
    this.oculto = !this.oculto;
  }

}
