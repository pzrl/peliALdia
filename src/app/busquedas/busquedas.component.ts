import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../services/busquedas.service';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {

  consulta: string;

  arrBusqueda: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.consulta = params.consulta;
      console.log(this.consulta)
      this.busquedasService.getBusquedas(this.consulta)
        .then(res => {
          this.arrBusqueda = res;
        }).catch(err => {
          console.log(err);
        });
    });
  }

  ngOnInit() { }

}
