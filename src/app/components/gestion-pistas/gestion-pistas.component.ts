import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { GestionPistasService } from './gestion-pistas.service';
import { CargaPistas } from './redux/store/pistas.actions';

@Component({
  selector: 'app-gestion-pistas',
  templateUrl: './gestion-pistas.component.html',
  styleUrls: ['./gestion-pistas.component.css']
})
export class GestionPistasComponent implements OnInit {

  constructor(public gestionPistasService: GestionPistasService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.gestionPistasService.getPistas().subscribe(data => {
      this.store.dispatch(new CargaPistas({lista: data}))
    })
  }

}
