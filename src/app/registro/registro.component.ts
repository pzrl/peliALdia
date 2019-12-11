import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario: FormGroup;
  alertaCampos: {};

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.alertaCampos = {
      user: false,
      email: false
    };

    this.formulario = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        apellidos: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        fechaNacimiento: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        rPassword: new FormControl('', [Validators.required]),
        avatar: new FormControl('', [Validators.required]),
        usuario: new FormControl('', [Validators.required]),
        cita: new FormControl('', [Validators.required])
      },
      [this.passwordValidator]
    );

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.formulario.value)
    this.usuariosService.guardarUsuario(this.formulario.value)
      .then((check) => {
        console.log('hola desde el component', check);
        if (check.user === false && check.email === false) {
          this.router.navigateByUrl('/login');
        }
        this.alertaCampos = check;
      }).catch((err) => {
        console.log(err);
      });
  }

  passwordValidator(form: FormGroup) {

    const passwordControl = form.controls['password'];
    const rPasswordControl = form.controls['rPassword'];

    console.log('cotrol password', passwordControl, rPasswordControl)

    if (passwordControl.value === rPasswordControl.value) {
      return null;
    } else {
      return { passwordvalidator: true };
    }
  }




}
