import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { GestionActividadesService } from '../gestion-actividades.service';
import { ActividadModel } from '../models/actividadModel';
import { EliminarActividad } from '../redux/store/actividades.actions';

@Component({
  selector: 'app-lista-actividades',
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css']
})
export class ListaActividadesComponent implements OnInit {

  actividades: ActividadModel[] = [];
  resultado: any;

  constructor(private store: Store<AppState>,
              public gestionActividadesService: GestionActividadesService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.store.select('actividad').subscribe(
    //   listActividades =>{
    //     this.actividades = listActividades.actividades
    //   })
    this.gestionActividadesService.getListaActividades();
  }

  delActividad(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar esta actividad?')){
      this.gestionActividadesService.borrarActividad(id).subscribe(data => {
        this.resultado = data;
        this.gestionActividadesService.getListaActividades();
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarActividad({id: id}));
          this.toastr.success("La actividad se ha eliminado correctamente");
        }else{
          this.toastr.error("No se ha podido eliminar la actividad");
        }
      })
    }
  }

  editar(actividad: ActividadModel){
    this.gestionActividadesService.actualizar(actividad);
  }
}