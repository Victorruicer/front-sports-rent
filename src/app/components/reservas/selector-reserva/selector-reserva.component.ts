import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActividadModel } from '../../gestion-actividades/models/actividadModel';
import { ReservasService } from '../reservas.service';
import { PistaReservaModel } from '../models/pistaReservaModel';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { EnReservaNull, PistasDisponibles } from '../redux/store/reserva.actions';

@Component({
  selector: 'app-selector-reserva',
  templateUrl: './selector-reserva.component.html',
  styleUrls: ['./selector-reserva.component.css']
})

export class SelectorReservaComponent implements OnInit {

  formulario: FormGroup;
  resultado: any;
  actividades: ActividadModel[];
  pistas: PistaReservaModel[];
  fechaReserva: string;

  fechaddmmyy: any;
  displayMonths = 1;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible'
  @ViewChild('dp') dp: NgbDatepicker;
  verDetalleReserva: boolean;
  hayPistas: boolean;

  constructor(private fb: FormBuilder,
              private reservasService: ReservasService,
              private toastr: ToastrService,
              private store: Store<AppState>) {
    this.formulario = this.fb.group({
      selectActividad: ['', Validators.required],
      dp: ''
    });
    this.verDetalleReserva = false;
    this.hayPistas = false;
    this.store.dispatch(new EnReservaNull());
   }

  ngOnInit(): void {
    this.reservasService.getActividades().subscribe(
      actividades => {
        if(actividades.length > 0){
            this.actividades = actividades;
            console.log(actividades)
        }
      });
      this.store.select('reserva').subscribe(
        enreserva => {
          if(enreserva.enReserva != null){
            this.verDetalleReserva = true;
          }
        }
      )
  }

  resetPistas(){
    this.hayPistas = false;
  }

  get selectActividadNoValido(){
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
    this.fechaReserva = objetoFecha.day+"/"+objetoFecha.month+"/"+objetoFecha.year;
    var actividadID = (this.formulario.get('selectActividad').value).split('-');
    var actividad = actividadID[1];
    this.reservasService.getPistasReserva(actividad, this.fechaReserva).subscribe(
      pistas => {
        if(pistas.length > 0){
                console.log(pistas);
          this.pistas = pistas;
          this.store.dispatch(new PistasDisponibles({lista: pistas}));
          this.hayPistas = true;
        }else{
          this.toastr.warning("No hay pistas disponibles para " + actividad + " el " + this.fechaReserva);
        }
      })

   }


}
