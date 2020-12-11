import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GestionTarifasService } from './gestion-tarifas.service';

@Component({
  selector: 'app-gestion-tarifas',
  templateUrl: './gestion-tarifas.component.html',
  styleUrls: ['./gestion-tarifas.component.css']
})
export class GestionTarifasComponent implements OnInit {

  constructor(private gestionTarifasService: GestionTarifasService, private store: Store<AppState>) { }

  ngOnInit(): void {
    
  }

}
