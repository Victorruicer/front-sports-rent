import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActividadModel } from '../models/actividadModel';
import { ReservasService } from '../reservas.service';

@Component({
  selector: 'app-selector-reserva',
  templateUrl: './selector-reserva.component.html',
  styleUrls: ['./selector-reserva.component.css']
})

export class SelectorReservaComponent implements OnInit {

  formulario: FormGroup;
  resultado: any;
  actividades: ActividadModel[];

  fechaddmmyy: any;
  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible'
  @ViewChild('dp') dp: NgbDatepicker;

  constructor(private fb: FormBuilder,private reservasService: ReservasService, private toastr: ToastrService) {
    this.formulario = this.fb.group({
      selectActividad: ['', Validators.required],
      dp: ''
    });
   }

  ngOnInit(): void {
    this.reservasService.getActividades().subscribe(
      actividades => {
        if(actividades.length > 0){
            this.actividades = actividades;

        }
      }
    )
  }

  get aelectActividadNoValido(){
    return this.formulario.get('selectActividad').invalid && this.formulario.get('selectActividad').touched;
  }

  //Habilitar solo dias reservables
  isDisabled(date: NgbDateStruct) {
    var hoy = new Date();
    var reservable = new Date();
    reservable.setDate(reservable.getDate() + 10);
    const d = new Date(date.year, date.month - 1, date.day);
    //deshabilitamos los domingos, los dias anteriores a hoy y los poteriores a hoy + 10
    return d.getDay() === 0 || d < hoy || d > reservable;
  }

  buscaPistas(){
    var objetoFecha = this.formulario.get('dp').value;
    var fecha = objetoFecha.day+"/"+objetoFecha.month+"/"+objetoFecha.year;
    var actividadID = (this.formulario.get('selectActividad').value).split('-');
    var actividad = actividadID[1];
    console.log(actividad);
    this.reservasService.getPistasReserva(actividad, fecha).subscribe(
      pistas => {
        if(pistas[0].Mensaje != "No existen pistas disponibles."){



        }else{
          this.toastr.warning(pistas[0].Mensaje + " para " + actividad);
        }
      }
    )
   }


}
