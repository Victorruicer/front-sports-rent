import { Component, OnInit } from '@angular/core';
import { GestionUsuariosService } from '../gestion-usuarios.service';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  resultado:any;

  constructor(public gestionUsuariosService: GestionUsuariosService) { }

  ngOnInit(): void {
    this.gestionUsuariosService.getListaUsuarios();
  }

  delUsuario(id: number){
    if(confirm('¿Estás seguro de que quieres eliminar este usuario?')){
      this.gestionUsuariosService.borrarUsuario(id).subscribe(data => {
        this.resultado = data;
        this.gestionUsuariosService.getListaUsuarios();
      })
    }
  }

  editar(usuario: UserModel){
    this.gestionUsuariosService.actualizar(usuario);
  }
}
