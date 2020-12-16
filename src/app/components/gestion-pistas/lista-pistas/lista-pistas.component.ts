import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { GestionPistasService } from '../gestion-pistas.service';
import { PistaModel } from '../models/PistaModel';
import { EliminarPista } from '../redux/store/pistas.actions';

@Component({
  selector: 'app-lista-pistas',
  templateUrl: './lista-pistas.component.html',
  styleUrls: ['./lista-pistas.component.css']
})
export class ListaPistasComponent implements OnInit {

  pistas: PistaModel[] = [];
  resultado: any;

  constructor(private store: Store<AppState>,
              public gestionPistasService: GestionPistasService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.gestionPistasService.getListaPistas();
  }

  //Borrar pista
  delPista(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar esta pista?')){
      this.gestionPistasService.borrarPista(id).subscribe(data => {
        this.resultado = data;
        this.gestionPistasService.getListaPistas();
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarPista({id: id}));
          this.toastr.success("La pista se ha eliminado correctamente");
        }else{
          this.toastr.error("No se ha podido eliminar la pista");
        }
      })
    }
  }

  //Editar campos de la pista
  editar(pista: PistaModel){
    this.gestionPistasService.actualizar(pista);
  }

  //Habilitar o deshabilitar la pista
  habilitar(pista: PistaModel){
    console.log(pista)
    pista.Operativa = !pista.Operativa;
    this.gestionPistasService.actualizarPista(pista).subscribe(
      datos => {
        if(datos['Retcode'] === 0){
          if(pista.Operativa){
            this.toastr.success("Pista habilitada");
          }else{
            this.toastr.success("Pista deshabilitada");
          }
        }else{
          this.toastr.error("No se ha podido cambiar el estado de la pista")
        }
      }
    );
  }
}
