import { Component, OnInit } from '@angular/core';
import { CinesService } from '../services/cines.service';

@Component({
  selector: 'app-mis-cines',
  templateUrl: './mis-cines.component.html',
  styleUrls: ['./mis-cines.component.css']
})
export class MisCinesComponent implements OnInit {

  token: string;
  arrCines: [];

  constructor(private cinesService: CinesService) { }

  async ngOnInit() {
    this.token = localStorage.token_peliALdia;

    await this.cinesService.getCinesFavoritos(this.token)
      .then(res => {
        console.log('los datos de miscines ts', res);
        this.arrCines = res;
      })
      .catch(err => {
        console.log('fukin error', err);
      });
  }

}
