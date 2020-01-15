import { Component, OnInit } from '@angular/core';
import { CinesService } from '../services/cines.service';

@Component({
  selector: 'app-mis-cines',
  templateUrl: './mis-cines.component.html',
  styleUrls: ['./mis-cines.component.css']
})
export class MisCinesComponent implements OnInit {

  token: string;
  sinFavoritos: boolean;
  arrCines: [];

  constructor(private cinesService: CinesService) { }

  async ngOnInit() {
    this.token = localStorage.token_peliALdia;

    this.arrCines = await this.cinesService.getCinesFavoritos(this.token)
    if (this.arrCines.length === 0) {
      this.sinFavoritos = true;
    }
    else {
      this.sinFavoritos = false;
    }
  }

  onClick(pId) {
    const cineFavorito = {
      idCine: pId,
      idUsuario: this.token,
      favorito: 0
    };
    this.cinesService.marcarCine(cineFavorito)
      .then(res => {
        document.getElementById(pId).style.display = 'none';
      });

  }

}
