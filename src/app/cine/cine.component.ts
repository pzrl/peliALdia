import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinesService } from '../services/cines.service';
import { resolve } from 'url';
import { reject } from 'q';

@Component({
  selector: 'app-cine',
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css']
})
export class CineComponent implements OnInit {

  id: number;
  cine: {};

  constructor(
    private activatedRoutes: ActivatedRoute,
    private cinesServices: CinesService
  ) { }

  ngOnInit() {

    this.id = this.activatedRoutes.params['_value'].idCine;

    this.cinesServices.getCine(this.id)
      .then((res) => {
        this.cine = res;
        console.log(this.cine)
      }).catch((err) => {
        reject(err);
      })


    console.log(this.cine);
  }

}
