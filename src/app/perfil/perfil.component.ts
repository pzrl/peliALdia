import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  token: string;
  arrUsuario: any;

  constructor(private usuariosService: UsuariosService) {
    this.token = localStorage.token_peliALdia;
  }

  async ngOnInit() {
    this.arrUsuario = await this.usuariosService.getMainUser(this.token)
    if (this.arrUsuario.puntuacionMedia === 'NaN') {
      this.arrUsuario.puntuacionMedia = null;
    }
  }

}
