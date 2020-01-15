import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinesService } from '../services/cines.service';
import { reject } from 'q';

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {

  token: string;
  id: number;
  cine: {};
  puntuacion: any;
  favorito: boolean;
  arrPeliculas: [];
  datosCine: any;
  cartelera: boolean;
  opiniones: boolean;

  constructor(
    private activatedRoutes: ActivatedRoute,
    private cinesService: CinesService,
    private router: Router
  ) { }



  async ngOnInit() {
    this.cartelera = true;
    this.opiniones = false;
    this.token = localStorage.token_peliALdia;
    this.id = this.activatedRoutes.params['_value'].idItem;

    await this.cinesService.getCine(this.id)
      .then((res) => {
        if (res.length == 0) {
          this.router.navigateByUrl('/in/error404');
        }
        else {
          this.cine = res;
        }
      });

    this.arrPeliculas = await this.cinesService.getPeliculasCine(this.token, this.id);


    await this.cinesService.getDatosCineUsuario(this.token, this.id)
      .then(res => {
        this.puntuacion = res[0].puntuacion;
        if (res[0].favorito === 1) {
          this.favorito = true;
        } else {
          this.favorito = false;
        }
      })

    await this.cinesService.getDatosCine(this.id)
      .then(res => {
        this.datosCine = {
          puntuacion: res.puntuacion,
          numeroPuntuaciones: res.numeroPuntuaciones
        };
        if (this.datosCine.puntuacion === 'NaN') { this.datosCine.puntuacion = null; }
        if (this.datosCine.numeroPuntuaciones === 'NaN') { this.datosCine.numeroPuntuaciones = null; }
      })

  }


  onClick(pFavorito) {
    const cineFavorito = {
      idCine: this.id,
      idUsuario: this.token,
      favorito: pFavorito
    };
    if (pFavorito == 0) {
      this.favorito = false;
    }
    else if (pFavorito == 1) {
      this.favorito = true;
    }
    this.cinesService.marcarCine(cineFavorito);
  }


  onChange(pNota) {
    const datosPunt = {
      idCine: this.id,
      idUsuario: this.token,
      puntuacion: pNota
    }
    this.cinesService.puntuarCine(datosPunt)
  }

  onClickC() {
    this.cartelera = true;
    this.opiniones = false;
    document.getElementById('btnCartelera').className = '';
    document.getElementById('btnOpiniones').className = 'inactivo';
  }

  onClickO() {
    this.cartelera = false;
    this.opiniones = true;
    document.getElementById('btnCartelera').className = 'inactivo';
    document.getElementById('btnOpiniones').className = '';
  }

}
