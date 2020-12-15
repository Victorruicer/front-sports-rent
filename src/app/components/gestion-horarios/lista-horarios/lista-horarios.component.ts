import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { GestionHorariosService } from '../gestion-horarios.service';
import { HorarioModel } from '../models/HorarioModel';
import { EliminarHorario } from '../redux/store/horario.actions';

@Component({
  selector: 'app-lista-horarios',
  templateUrl: './lista-horarios.component.html',
  styleUrls: ['./lista-horarios.component.css']
})
export class ListaHorariosComponent implements OnInit {

  horarios: HorarioModel[] = [];
  resultado: any;

  constructor(private store: Store<AppState>,
              public gestionHorariosService: GestionHorariosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gestionHorariosService.getListaHorarios();
  }

  delHorario(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar este horario?')){
      this.gestionHorariosService.borrarHorarios(id).subscribe(data => {
        this.resultado = data;
        this.gestionHorariosService.getListaHorarios();
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarHorario({id: id}));
          this.toastr.success("El horario se ha eliminado correctamente");
        }else{
          this.toastr.error("No se ha podido eliminar el horario");
        }
      })
    }
  }

  editar(horario: HorarioModel){
    this.gestionHorariosService.actualizar(horario);
  }
}
