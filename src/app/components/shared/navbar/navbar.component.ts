import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { DatosLogin } from '../../ident/models/datosLogin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: DatosLogin = null;
  idPerfil: number;
  isAuthenticated: boolean = false;

  constructor(private store: Store<AppState>){
    this.store.select('login').subscribe(
      login => {
        this.isAuthenticated = login.isAuthenticated
        if(this.isAuthenticated){
          this.user = login.user
        }
      }
    )
  }
  
  ngOnInit(){
    this.idPerfil = this.user.Id_Perfil;
    
  }

}
