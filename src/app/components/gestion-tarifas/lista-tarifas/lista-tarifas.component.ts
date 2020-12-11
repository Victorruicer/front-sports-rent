import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { GestionTarifasService } from '../gestion-tarifas.service';
import { TarifaModel } from '../models/TarifaModel';
import { EliminarTarifa } from '../redux/store/tarifas.actions';

@Component({
  selector: 'app-lista-tarifas',
  templateUrl: './lista-tarifas.component.html',
  styleUrls: ['./lista-tarifas.component.css']
})
export class ListaTarifasComponent implements OnInit {

  tarifas: TarifaModel[] = [];
  resultado: any;

  constructor(private store: Store<AppState>,
              public gestionTarifasService: GestionTarifasService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.store.select('tarifa').subscribe(
      listaTarifas =>{
        this.tarifas = listaTarifas.tarifas
      })
  }

  delTarifa(id: number){
    console.log("el id a borrar es: "+id)
    if(confirm('¿Estás seguro de que quieres eliminar esta tarifa?')){
      this.gestionTarifasService.borrarTarifa(id).subscribe(data => {
        this.resultado = data;
        this.gestionTarifasService.getListaTarifas();
        if(data['Retcode'] === 0){
          this.store.dispatch(new EliminarTarifa({id: id}));
          this.toastr.success("La tarifa se ha eliminado correctamente");
        }else{
          this.toastr.error("No se ha podido eliminar la tarifa");
        }
      })
    }
  }

  editar(tarifa: TarifaModel){
    this.gestionTarifasService.actualizar(tarifa);
  }
}