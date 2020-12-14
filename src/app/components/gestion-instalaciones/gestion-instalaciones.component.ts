import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GestionHorariosService } from '../gestion-horarios/gestion-horarios.service';
import { GestionInstalacionesService } from './gestion-instalaciones.service';
import { CargaInstalaciones } from './redux/store/instalaciones.actions';
import { CrearHorario, CargaHorarios } from '../gestion-horarios/redux/store/horario.actions';

@Component({
  selector: 'app-gestion-instalaciones',
  templateUrl: './gestion-instalaciones.component.html',
  styleUrls: ['./gestion-instalaciones.component.css']
})
export class GestionInstalacionesComponent implements OnInit {

  constructor(public gestionInstalacionesService: GestionInstalacionesService,
              public gestionHorariosService: GestionHorariosService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionInstalacionesService.getInstalaciones().subscribe(data => {
      this.store.dispatch(new CargaInstalaciones({lista: data}))
      this.gestionInstalacionesService.getHorarios().subscribe(
      horarios => {
        if(horarios.length > 0){
          this.store.dispatch(new CargaHorarios({lista: horarios}));
        }
      });
    });

  }

}
