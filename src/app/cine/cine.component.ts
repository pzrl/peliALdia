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
  favorito: boolean;

  constructor(
    private activatedRoutes: ActivatedRoute,
    private cinesServices: CinesService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.token = localStorage.token_peliALdia;
    this.id = this.activatedRoutes.params['_value'].idItem;

    await this.cinesServices.getCine(this.id)
      .then((res) => {
        this.cine = res;
      }).catch(err => {
        reject(err);
      });

    await this.cinesServices.getDatosCineUsuario(this.token, this.id)
      .then(res => {
        console.log('la respuesta del init', res);
        if (res[0].favorito === 1) {
          console.log(res[0].favorito)
          this.favorito = true;
          console.log(this.favorito)
        } else {
          console.log(res[0].favorito)
          this.favorito = false;
        }
      })
      .catch(err => console.log('da error', err));

  }

  onClick(pFavorito) {
    const cineFavorito = {
      idCine: this.id,
      idUsuario: this.token,
      favorito: pFavorito
    };
    this.cinesServices.marcarCine(cineFavorito)
      .then(res => {
        console.log(res)
        if (pFavorito === 0) {
          this.favorito = false;
        } else {
          this.favorito = true;
        }
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['cine/' + this.id]))
          .catch(err => console.log('Error en component', err))
      })

  }

}
