import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PistaReservaModel } from '../models/pistaReservaModel';
import { AppState } from '../../../app.reducer';

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.css']
})
export class CardReservaComponent implements OnInit {

  //@Input() datosPista: PistaReservaModel;
  @Input() pista: string;
  horarios: string[];
  formulario: FormGroup;
  datosPista: PistaReservaModel;
  precioFinal: number;
  totalHoras: number;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.crearFormulario();
   }

  ngOnInit(): void {
    this.store.select('reserva').subscribe(
      reservas =>{
        reservas.pistasDisponibles.map(
          pista => {
            if(pista.Pista == this.pista){
              this.datosPista = pista;
              this.horarios = this.creaSelectHorario(pista.LibresReservadas);
            }
          })
        })
    }

  crearFormulario(){

    this.formulario = this.fb.group({
      horaUno: '',
      horaDos: ''
    });
  }

  limpiar(){}

  creaSelectHorario(horas: string[]){
    var ini = 8;
    var selecthora = [];
    for(var x = 0; x < horas.length; x++){
      if(horas[x] == "libre"){
        var newhora = (ini < 10) ? "0"+ini+":00:00" : ini+":00:00";
        selecthora.push(newhora);
      }
      ini++;
    }
    console.log("horas libres = "+ selecthora);
    return selecthora;
  }

  reservar(){

    var datosUser = JSON.parse(sessionStorage.getItem('login'));

    console.log(datosUser.user.Id_Usuario);

    //Cargar datos del formulario
    const datosR: PistaReservaModel = {
      Fecha: this.datosPista.Fecha,
      H_ini: this.formulario.get('horaUno')?.value,
      H_fin: this.formulario.get('horaDos')?.value,
      Id_pista: this.datosPista.Id_pista,
      Id_usuario: datosUser.user.Id_Usuario,
      Id_estado: 1,
      Precio: this.precioFinal,
      Horas: this.totalHoras
    }



  }

}



