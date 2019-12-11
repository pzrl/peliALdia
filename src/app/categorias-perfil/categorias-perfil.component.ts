import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-categorias-perfil',
  templateUrl: './categorias-perfil.component.html',
  styleUrls: ['./categorias-perfil.component.css']
})

export class CategoriasPerfilComponent implements OnInit {

  identificador: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

  }

}
