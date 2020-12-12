import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GestionActividadesService } from './gestion-actividades.service';
import { CargaActividades } from './redux/store/actividades.actions';

@Component({
  selector: 'app-gestion-actividades',
  templateUrl: './gestion-actividades.component.html',
  styleUrls: ['./gestion-actividades.component.css']
})
export class GestionActividadesComponent implements OnInit {

  constructor(public gestionActividadesService: GestionActividadesService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionActividadesService.getActividades().subscribe(data => {
      this.store.dispatch(new CargaActividades({lista: data}))
    })
  }

}
