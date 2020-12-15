import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GestionHorariosService } from './gestion-horarios.service';
import { CargaHorarios } from './redux/store/horario.actions';

@Component({
  selector: 'app-gestion-horarios',
  templateUrl: './gestion-horarios.component.html',
  styleUrls: ['./gestion-horarios.component.css']
})
export class GestionHorariosComponent implements OnInit {

  constructor(public gestionHorariosService: GestionHorariosService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionHorariosService.getHorarios().subscribe(data => {
      this.store.dispatch(new CargaHorarios({lista: data}))
    })
  }

}
