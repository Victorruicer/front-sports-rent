import { Component, OnInit } from '@angular/core';
import { ReservasUser } from '../models/reservasUser';

@Component({
  selector: 'app-activos-alquiler',
  templateUrl: './activos-alquiler.component.html',
  styleUrls: ['./activos-alquiler.component.css']
})
export class ActivosAlquilerComponent implements OnInit {

  public listaReservas: ReservasUser[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
