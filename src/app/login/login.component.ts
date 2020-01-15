import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  alertaLogin: boolean;
  acceso: FormGroup;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.alertaLogin = false;
    this.acceso = new FormGroup({
      mail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    localStorage.removeItem('token_peliALdia');
  }

  onSubmit() {
    this.usuariosService.checkLogin(this.acceso.value)
      .then((res) => {
        if (res.alerta === true) {
          this.alertaLogin = true;
        } else {
          localStorage.setItem('token_peliALdia', res.token);
          this.router.navigateByUrl('/in/main');
        }
      });
  }

}
