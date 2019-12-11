import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  id: number;
  usuario: {};
  token: string;
  follow: boolean;
  block: boolean;

  constructor(
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    this.token = localStorage.token_peliALdia;
    this.id = this.activatedRoute.params['_value'].idItem;

    await this.usuariosService.getUsuarioById(this.id)
      .then(res => { console.log('los datos del user', res); this.usuario = res });

    await this.usuariosService.getDatosUsuarioUsuario(this.id, this.token)
      .then(res => {
        if (res[0] === undefined) {
          this.follow = true;
          this.block = true;
        } else {
          if (res[0].follow === 1) {
            this.follow = false;
          } else {
            this.follow = true;
          }
          if (res[0].block === 1) {
            this.block = false;
          } else {
            this.block = true;
          }
        }
      })
      .catch(err => console.log('da error', err));
  }

  onClickFollow(event) {
    const follow = {
      amigo: this.id,
      accion: event
    };
    this.usuariosService.followUser(this.token, follow)
      .then(res => {
        console.log('le folow', res);
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigateByUrl('usuario/' + this.id));
      });
  }

  onClickBlock(event) {
    const block = {
      amigo: this.id,
      accion: event
    };
    this.usuariosService.blockUser(this.token, block)
      .then(res => {
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigateByUrl('usuario/' + this.id));
      });
  }
}