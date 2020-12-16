import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { PistaReservaModel } from '../../reservas/models/pistaReservaModel';
import { GestionPagoService } from '../gestion-pago.service';
import { PagoModel } from '../models/pagoModel';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  reserva: PistaReservaModel;
  formulario: FormGroup;
  token = "pk_test_51Hyg3jC5SO2pUrdtEB4x6UN0ntTrIVnFUO3iMwJHJf0OJoMHE5nucqzymOF8j28X6XLMaaEbijgbj0Md448JAtLR00xBVZlnqU";

  constructor(private store: Store<AppState>, private fb: FormBuilder, private gestioPagoservice: GestionPagoService) {
      this.formulario = this.fb.group({
        token: '',
        amount: '',
    });
   }

  ngOnInit(): void {
    this.store.select('reserva').subscribe(
      en_reserva => {
          if(en_reserva != null){
            this.reserva = en_reserva.enReserva
          }
      });
  }

/*   onSubmit(){

    const datosP: PagoModel = {
      Token: this.token,
      Amount: 10,
    }

    console.log("amount = "+this.formulario.get('amount').value+" token = "+this.formulario.get('token').value)
    this.gestioPagoservice.checkout(datosP).subscribe(
      data =>
      console.log("respuesta ... " + data)
    )
  } */

}
