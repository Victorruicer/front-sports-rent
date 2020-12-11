import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReservasService } from './reservas.service';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  constructor(private reservasService: ReservasService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.reservasService.getActividades().subscribe(
      actividades => {
        if(actividades.length > 0){

        }
      }
    )
  }

}
