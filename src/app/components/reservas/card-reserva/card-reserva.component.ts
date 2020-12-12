import { Component, Input, OnInit } from '@angular/core';
import { PistaReservaModel } from '../models/pistaReservaModel';

@Component({
  selector: 'app-card-reserva',
  templateUrl: './card-reserva.component.html',
  styleUrls: ['./card-reserva.component.css']
})
export class CardReservaComponent implements OnInit {

  @Input() datosPista: PistaReservaModel;
  horarios: string[];
  constructor() { }

  ngOnInit(): void {
    this.horarios = this.creaSelectHorario(this.datosPista.LibresReservadas);
    }

    creaSelectHorario(horas: string[]){
    var ini = 8;
    var selecthora = [];
    for(var x = 0; x < horas.length; x++){
      if(horas[x] == "libre"){
        var newhora = (ini < 10) ? "0"+ini+":00:00" : ini+":00:00";
        console.log(newhora);
        selecthora.push(newhora);
      }
      ini++;
    }
    console.log("horas libres = "+ selecthora);
    return selecthora;
  }

}



