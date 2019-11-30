import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  acceso: FormGroup;

  constructor(private usuariosService: UsuariosService) {
    this.acceso = new FormGroup(
      {
        mail: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    );
  }

  ngOnInit() {
  }

  onSubmit() {
    this.usuariosService.checkLogin(this.acceso.value)
      .then((response) => {
        console.log(response);
        localStorage.setItem('usuario', response);
      }).catch((err) => {
        console.log('error en component', err);
      });

  }


}
