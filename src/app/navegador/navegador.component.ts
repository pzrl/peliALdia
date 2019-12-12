import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-navegador',
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.css']
})
export class NavegadorComponent implements OnInit {

  consulta: string;
  oculto: boolean;
  arrUsuario: [];

  constructor(
    private usuariosService: UsuariosService,
    private peliculasService: PeliculasService
  ) { }

  async ngOnInit() {
    this.oculto = false;

    await this.usuariosService.getMainUser(localStorage.token_peliALdia)
      .then(res => this.arrUsuario = res)
      .catch(err => console.log('error en component'));
  }

  onClick($event) {
    this.peliculasService.cargarAPI()
      .then(res => console.log(res));
  }

  onClickPerfil() {
    this.oculto = !this.oculto;
  }

}
