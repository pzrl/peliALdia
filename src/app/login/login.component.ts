import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  acceso: FormGroup;

  constructor() {
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
    console.log(this.acceso.value)

  }


}
