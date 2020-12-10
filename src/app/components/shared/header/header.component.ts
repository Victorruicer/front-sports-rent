import { Component, OnInit } from '@angular/core';
import { DatosLogin } from '../../ident/models/datosLogin';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imgPerfil: string;
  userName: string;
  logado = false;

  constructor(private auth: AuthService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
/*     this.auth.user.subscribe(user => {
      if(user == null){
        this.logado = false;
      }else{
      this.logado = true;
      this.userName = user.Nombre + " " + user.Apellido1;
      this.imgPerfil = user.Imagen;
      }
    }) */
    this.store.select('login').subscribe(currentUser => {
      if(currentUser.isAuthenticated){
        this.logado = true;
        this.userName = currentUser.user.Nombre + " " + currentUser.user.Apellido1;
        this.imgPerfil = currentUser.user.Imagen;
      }else{
        this.logado = false;
      }
    })

  }

  logout(){
    this.auth.logout();
  }

}
