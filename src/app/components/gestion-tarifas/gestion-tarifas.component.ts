import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GestionTarifasService } from './gestion-tarifas.service';
import { CargaTarifas } from './redux/store/tarifas.actions';

@Component({
  selector: 'app-gestion-tarifas',
  templateUrl: './gestion-tarifas.component.html',
  styleUrls: ['./gestion-tarifas.component.css']
})
export class GestionTarifasComponent implements OnInit {

  constructor(private gestionTarifasService: GestionTarifasService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionTarifasService.getTarifas().subscribe(data => {
      this.store.dispatch(new CargaTarifas({lista: data}))
    })
  }

}
