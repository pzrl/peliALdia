import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario: FormGroup;

  constructor(private usuariosService: UsuariosService) {

    this.formulario = new FormGroup(
      {
        nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        apellidos: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        fechaNacimiento: new FormControl('', [Validators.required]),
        mail: new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        rPassword: new FormControl('', [Validators.required]),
        avatar: new FormControl('', [Validators.required]),
        usuario: new FormControl('', [Validators.required]), // AÑADIR CONTROL CON LA BASE DE DATOS
        cita: new FormControl('', [Validators.required])
      },
      [this.passwordValidator]
    );

  }

  ngOnInit() {
  }

  onSubmit() {
    this.usuariosService.guardarUsuario(this.formulario.value)
      .then((response) => {
        console.log('que pacha', response);
      }).catch((err) => {
        console.log('errorsito', err);
      });
  }

  passwordValidator(form: FormGroup) {
    const passwordControl = form.controls['password'];
    const rPasswordControl = form.controls['rPassword'];

    if (passwordControl.value === rPasswordControl.value) {
      return null;
    } else {
      return { passwordvalidator: true }
    }
  }




}
