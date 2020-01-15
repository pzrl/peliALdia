import { Component, OnInit, ɵConsole } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  arrAvatares: any;
  avatarSeleccionado: string;
  formulario: FormGroup;

  token: string;
  arrUsuario: [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      avatar: new FormControl('', [Validators.required]),
      cita: new FormControl('', [Validators.required])
    });
  }

  async ngOnInit() {
    this.token = localStorage.token_peliALdia;

    this.arrAvatares = await this.usuariosService.getAvatares()

    this.arrUsuario = await this.usuariosService.getMainUser(this.token)
  }

  onSubmit() {
    this.usuariosService.actualizarPerfil(this.formulario.value, localStorage.token_peliALdia)
      .then((check) =>
        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['in/main']))
      )
  }

  onChange(pAvatar) {
    this.avatarSeleccionado = pAvatar;
  }
}
