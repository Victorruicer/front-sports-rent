import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { PistaReservaModel } from '../../reservas/models/pistaReservaModel';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  reserva: PistaReservaModel;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('reserva').subscribe(
      en_reserva => {
          if(en_reserva != null){
            this.reserva = en_reserva.enReserva
          }
      });
  }

}
