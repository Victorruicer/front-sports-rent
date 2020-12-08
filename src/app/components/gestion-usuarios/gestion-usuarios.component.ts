import { Component, OnInit } from '@angular/core';
import { GestionUsuariosService } from './gestion-usuarios.service';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { CargaUsers } from './redux/store/usuario.actions';
import { UserModel } from './models/userModel';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  constructor(private gestionUsuariosService: GestionUsuariosService,
              private store: Store<AppState>) { }

  ngOnInit(): void {

  }
}
