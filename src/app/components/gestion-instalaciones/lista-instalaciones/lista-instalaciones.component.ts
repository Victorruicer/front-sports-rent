import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { GestionInstalacionesService } from '../gestion-instalaciones.service';
import { InstalacionModel } from '../models/InstalacionModel';
import { EliminarInstalacion } from '../redux/store/instalaciones.actions';

@Component({
  selector: 'app-lista-instalaciones',
  templateUrl: './lista-instalaciones.component.html',
  styleUrls: ['./lista-instalaciones.component.css']
})
export class ListaInstalacionesComponent implements OnInit {

  instalaciones: InstalacionModel[] = [];
  resultado: any;

  constructor(public gestionInstalacionesService: GestionInstalacionesService,
              private store: Store<AppState>,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.store.select('instalacion').subscribe(
    //   listaInstalaciones =>{
    //     this.instalaciones = listaInstalaciones.instalaciones
    // })
    this.gestionInstalacionesService.getListaInstalaciones();
  }

  delInstalacion(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar esta instalación?')){
      this.gestionInstalacionesService.borrarInstalacion(id).subscribe(data => {
        this.resultado = data;
        this.gestionInstalacionesService.getListaInstalaciones();
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarInstalacion({id: id}));
          this.toastr.success("La instalación se ha eliminado correctamente");
        }else{
          this.toastr.error("No se ha podido eliminar la instalación!");
        }
      })
    }
  }

  editar(instalacion: InstalacionModel){
    this.gestionInstalacionesService.actualizar(instalacion);
  }
}
