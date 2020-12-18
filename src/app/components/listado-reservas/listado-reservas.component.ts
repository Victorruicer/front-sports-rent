import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ListadoReservasService } from './listado-reservas.service';

@Component({
  selector: 'app-listado-reservas',
  templateUrl: './listado-reservas.component.html',
  styleUrls: ['./listado-reservas.component.css']
})
export class ListadoReservasComponent implements OnInit {

  constructor(public listadoReservasService: ListadoReservasService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //Recuperamos las reservas activas de todos los usuarios
    this.listadoReservasService.historicoReservas();
  }

  cancelarReserva(idReserva:number){
    if(confirm('¿Estás seguro de que quieres cancelar esta reserva?')){
      this.listadoReservasService.borrarReserva(idReserva).subscribe(data => {
        this.listadoReservasService.historicoReservas();
        if(data['Retcode'] === 0){
          this.toastr.success("La reserva se ha cancelado correctamente");
        }else{
          this.toastr.error("No se ha podido cancelar la reserva");
        }
      });
    }
  }
  
}
