import { Component, OnInit } from '@angular/core';
import { DatosLogin } from '../../ident/models/datosLogin';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imgPerfil: string;
  userName: string;
  logado = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if(user == null){
        this.logado = false;
      }else{
      this.logado = true;
      this.userName = user.Nombre + " " + user.Apellido1;
      this.imgPerfil = user.Imagen;
      }
    })
  }

  logout(){
    this.auth.logout();
  }

}
