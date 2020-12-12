import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.reducer';
import { GestionActividadesService } from '../gestion-actividades.service';
import { ActividadModel } from '../models/actividadModel';
import { CrearActividad } from '../redux/store/actividades.actions';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;

  constructor( private fb: FormBuilder,
              private store: Store<AppState>,
              public gestionActividadesService: GestionActividadesService,
              private toastr: ToastrService) 
  {
    this.formulario = this.fb.group({
      id       : 0,
      actividad    : ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  get actividadNoValido(){
    return this.formulario.get('actividad').invalid && this.formulario.get('actividad').touched;
  }

  //Método de submit de formulario
  actualizar(){

    //Control de validación del formulario
    if(this.formulario.invalid){

      return Object.values(this.formulario.controls).forEach( control =>{

        if(control instanceof FormGroup){
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }

        control.markAsTouched();
      });
    }

    //Cargar datos del formulario
    const datosA: ActividadModel = {
      Actividad: this.formulario.get('actividad').value
    }

    this.gestionActividadesService.crearActividad(datosA).subscribe(
      data => {
        if(data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Actividad creada correctamente");
          this.store.dispatch(new CrearActividad(data));
        }else{
          this.toastr.error("No se ha podido crear la actividad!");
        }
        this.formulario.reset();
      })
  }
}
