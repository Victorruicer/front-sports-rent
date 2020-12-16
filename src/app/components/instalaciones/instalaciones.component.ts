import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { GestionInstalacionesService } from '../gestion-instalaciones/gestion-instalaciones.service';
import { GestionPistasService } from '../gestion-pistas/gestion-pistas.service';
import { CargaPistas } from '../gestion-pistas/redux/store/pistas.actions';


@Component({
  selector: 'app-instalaciones',
  templateUrl: './instalaciones.component.html',
  styleUrls: ['./instalaciones.component.css']
})
export class InstalacionesComponent implements OnInit {

  constructor(public gestionInstalacionesService: GestionInstalacionesService,
     private store: Store<AppState>, private gestionPistasService: GestionPistasService) { }

  ngOnInit(): void {
    this.gestionInstalacionesService.getListaInstalaciones();
    this.gestionPistasService.getPistas().subscribe(
      pistas => {
        console.log(pistas)
        this.store.dispatch(new CargaPistas({lista: pistas}))
      }
    )
  }

}
