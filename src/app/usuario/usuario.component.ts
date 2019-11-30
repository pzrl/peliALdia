import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { resolve } from 'url';
import { reject } from 'q';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  /* arrUsuarios: any; */
  id: number;
  usuario: {};

  formulario: FormGroup;
  arrPosts: [];

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {
    this.formulario = new FormGroup({ post: new FormControl('') });
  }

  ngOnInit() {
    this.id = this.activatedRoute.params['_value'].idUsuario;

    this.usuariosService.getUsuario(this.id)
      .then((res) => {
        this.usuario = res;
        console.log(this.usuario);
      }).catch((err) => {
        reject(err);
      });
  }

  /* onSubmit() {
    const post = this.formulario.value.post;
    console.log(this.formulario.value.post)
    this.arrPosts.push(post);
    console.log(this.arrPosts)
  } */

}

/*   recogerUsuarios() {
    this.usuariosService.getAll()
      .then((res) => {
        this.arrUsuarios = res;
      }).catch((err) => {
        reject(err);
      });
  } */