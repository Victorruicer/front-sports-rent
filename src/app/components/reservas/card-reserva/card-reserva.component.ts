import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  cambia = true;


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
              this.horarios = this.creaSelectHorario(this.datosPista.LibresReservadas, this.cambia);
            }
          })
        })
    }

    //al cambiar la seleccion del radio cambiamos los valores del select que se mostrará
    cambiaHora(evt) {
      this.cambia = (evt.target.value == "option1") ? true : false;
      this.horarios = this.creaSelectHorario(this.datosPista.LibresReservadas, this.cambia);
    }

  crearFormulario(){

    this.formulario = this.fb.group({
      horaUno: '',
      horaDos: '',
      radio: ['', Validators.required]
    });
  }

  limpiar(){}

  creaSelectHorario(horas: string[], opcion: boolean){
    var ini = 8;
    var selecthora = [];
      console.log("las horas "+horas)
      for(var x = 0; x < horas.length; x++){
        if(horas[x] == "libre"){
          switch(x){
/*             case (0):
              if(opcion){
                selecthora.push(this.transformaHora(ini, opcion));
              }else{
                if(horas[x+1] != 'reservada'){
                selecthora.push(this.transformaHora(ini, opcion));
                }
              }
              break; */
            case (horas.length -2):
              if(opcion){
                selecthora.push(this.transformaHora(ini, opcion));
              }
              break;
            default:
              if(opcion){
                selecthora.push(this.transformaHora(ini, opcion));
              }else{
                if(horas[x+1] != 'reservada'){
                selecthora.push(this.transformaHora(ini, opcion));
                }
              }
              break;
          }
        }
/*         if(horas[x] == "libre"){

          var hini = (ini < 10) ? "0"+ini+":00" : ini+":00";
          var hfin = (ini+1 < 10) ? "0"+(ini+1)+":00" : (ini+1)+":00";

          var newhora = "de "+hini+" a "+hfin;
          selecthora.push(newhora);
        }*/
        ini++;
      }
    console.log("horas libres = "+ selecthora);
    return selecthora;
  }

    transformaHora(ini: number, opcion: boolean) {
      if(opcion){
      var hini = (ini < 10) ? "0"+ini+":00" : ini+":00";
      var hfin = (ini+1 < 10) ? "0"+(ini+1)+":00" : (ini+1)+":00";
      }else{
      var hini = (ini < 10) ? "0"+ini+":00" : ini+":00";
      var hfin = (ini+2 < 10) ? "0"+(ini+1)+":00" : (ini+2)+":00";
      }

      return "de "+hini+" a "+hfin;
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



