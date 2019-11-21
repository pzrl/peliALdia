import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  arrUsuarios: Usuario[];


  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {

    this.arrUsuarios = this.usuariosService.getAllUsuarios();
  }




}
