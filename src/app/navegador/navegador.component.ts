import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { UsuariosService } from '../services/usuarios.service';
import { CinesService } from '../services/cines.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {

  consulta: string;
  oculto: boolean;
  linksOcultos: boolean;
  arrUsuario: [];

  constructor(
    private usuariosService: UsuariosService,
    private cinesService: CinesService
  ) { }

  async ngOnInit() {
    this.oculto = false;
    this.linksOcultos = false;

    this.arrUsuario = await this.usuariosService.getMainUser(localStorage.token_peliALdia)
  }

  onClickPerfil() {
    this.oculto = !this.oculto;
    this.linksOcultos = false;
  }

  onClickMenu() {
    this.linksOcultos = !this.linksOcultos;
    this.oculto = false;
  }

}
