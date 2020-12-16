import { Component, Input, OnInit } from '@angular/core';
import { InstModel } from '../models/InstModel';
import { GestionInstalacionesService } from '../../gestion-instalaciones/gestion-instalaciones.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { PistaModel } from '../../gestion-pistas/models/PistaModel';
import { PistasDisponibles } from '../../reservas/redux/store/reserva.actions';
import { ActividadModel } from '../../gestion-actividades/models/actividadModel';

@Component({
  selector: 'app-card-instalacion',
  templateUrl: './card-instalacion.component.html',
  styleUrls: ['./card-instalacion.component.css']
})
export class CardInstalacionComponent implements OnInit {

  @Input() instalacion: InstModel;
  operativa: string;
  pistas: PistaModel[];
  actividades: string[] = [];

  constructor(private gestionInstalacionesService: GestionInstalacionesService,
     private store: Store<AppState>) {

      }

  ngOnInit(): void {
    if(this.instalacion.Operativa){
      this.operativa = "La instalación está actualmente en servicio"
    }else{
      this.operativa = "La instalación no está en servicio"
    }
    this.store.select('pista').subscribe(
      pistas => {
        pistas.pistas.map(
          pista => {
            if(pista.Id_instalacion == this.instalacion.Id_instalacion){
              this.actividades.push(pista.Actividad)
            }
          })
      })
      console.log(this.actividades)
  }

}
