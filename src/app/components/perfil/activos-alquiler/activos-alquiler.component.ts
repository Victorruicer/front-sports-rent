import { Component, OnInit } from '@angular/core';
import { ReservasUser } from '../molels/reservasUser.model';

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
