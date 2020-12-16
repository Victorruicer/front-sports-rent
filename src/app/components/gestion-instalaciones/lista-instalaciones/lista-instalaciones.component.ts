import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { HorarioModel } from '../../gestion-horarios/models/HorarioModel';
import { GestionInstalacionesService } from '../gestion-instalaciones.service';
import { InstalacionModel } from '../models/InstalacionModel';
import { EliminarInstalacion } from '../redux/store/instalaciones.actions';

@Component({
  selector: 'app-lista-instalaciones',
  templateUrl: './lista-instalaciones.component.html',
  styleUrls: ['./lista-instalaciones.component.css']
})
export class ListaInstalacionesComponent implements OnInit {

  horarios: HorarioModel[] = [];
  resultado: any;

  constructor(public gestionInstalacionesService: GestionInstalacionesService,
              private store: Store<AppState>,
              private toastr: ToastrService,
              private gestionhorariosservice: GestionInstalacionesService) 
  {
    this.gestionInstalacionesService.getListaInstalaciones();
  }

  ngOnInit(): void {
    this.gestionhorariosservice.getHorarios().subscribe(horarios => { this.horarios = horarios})
  }

  delInstalacion(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar esta instalación?')){
      this.gestionInstalacionesService.borrarInstalacion(id).subscribe(data => {
        this.resultado = data;
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarInstalacion({id: id}));
          this.toastr.success("La instalación se ha eliminado correctamente");
        }else{
          this.toastr.error("No se ha podido eliminar la instalación: ", "Posiblemente queden pistas asociadas a esta instalación!");
        }
        this.gestionInstalacionesService.getListaInstalaciones();
      })
    }
  }

  //Editar campos de la instalación
  editar(instalacion: InstalacionModel){
    this.gestionInstalacionesService.actualizar(instalacion);
  }

  //Habilitar o deshabilitar la instalacion
  habilitar(instalacion: InstalacionModel){
    console.log(instalacion)
    instalacion.Operativa = !instalacion.Operativa;
    this.gestionInstalacionesService.actualizarInstalacion(instalacion).subscribe(
      datos => {
        if(datos['Retcode'] === 0){
          if(instalacion.Operativa){
            this.toastr.success("Instalación habilitada");
          }else{
            this.toastr.success("Instalación deshabilitada");
          }
        }else{
          this.toastr.error("No se ha podido cambiar el estado de la instalación")
        }
      }
    );
  }
}
