import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-gestion-pago',
  templateUrl: './gestion-pago.component.html',
  styleUrls: ['./gestion-pago.component.css']
})
export class GestionPagoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
