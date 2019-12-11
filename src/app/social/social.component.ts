import { Component, OnInit } from '@angular/core';
import { SocialService } from '../services/social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  token: string;
  peliculasVistas: {};
  ultimosMensajes: {};

  constructor(private socialService: SocialService) { }

  ngOnInit() {

    this.token = localStorage.token_peliALdia;

    this.socialService.getPelicuasVistas(this.token)
      .then(res => {
        this.peliculasVistas = res
      })
      .catch(err => console.log(err));

    this.socialService.getUltimosMensajes(this.token)
      .then(res => {
        this.ultimosMensajes = res
      })
      .catch(err => console.log(err));



  }

}
