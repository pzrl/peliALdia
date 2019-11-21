import { Injectable } from '@angular/core';
import { USUARIOS } from '../db/usuarios.db';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  getAllUsuarios() {
    return USUARIOS;
  }
}
