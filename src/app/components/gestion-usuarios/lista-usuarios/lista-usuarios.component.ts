import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GestionUsuariosService } from '../gestion-usuarios.service';
import { AppState } from '../../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { EliminarUser } from '../redux/store/usuario.actions';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: UserModel[] = [];
  resultado: any;

  constructor(public gestionUsuariosService: GestionUsuariosService,
              private store: Store<AppState>,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.gestionUsuariosService.getListaUsuarios();
    this.store.select('users').subscribe(
      listaUsers =>{
        this.usuarios = listaUsers.users
      })
  }

  delUsuario(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar este usuario?')){
      this.gestionUsuariosService.borrarUsuario(id).subscribe(data => {
        this.resultado = data;
        this.gestionUsuariosService.getListaUsuarios();
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarUser({id: id}));
          this.toastr.success("Se ha dado de baja al usuario correctamente");
        }else{
          this.toastr.error("No se ha podido dar de baja al usuario");
        }
      })
    }
  }

  editar(usuario: UserModel){
    this.gestionUsuariosService.actualizar(usuario);
  }
}
