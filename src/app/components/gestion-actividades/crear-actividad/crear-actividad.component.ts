import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { GestionActividadesService } from '../gestion-actividades.service';
import { ActividadModel } from '../models/actividadModel';
import { CrearActividad, EditarActividad } from '../redux/store/actividades.actions';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  resultado: string;
  subscription: Subscription;
  upActividad: ActividadModel;
  idActividad = 0;

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
    this.subscription = this.gestionActividadesService.obtenerActividad$().subscribe(data =>{
      this.upActividad = data;

      this.formulario.patchValue({
        actividad: this.upActividad.Actividad
      });
      this.idActividad = this.upActividad.Id_actividad;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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

    if(this.idActividad === undefined){
      this.crear(datosA);
    }else{
      this.editar(datosA);
    }
  }
    
  crear(datosA: ActividadModel){
    this.gestionActividadesService.crearActividad(datosA).subscribe(
      data => {
        if(data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Actividad creada correctamente");
          this.store.dispatch(new CrearActividad(data));
        }else{
          this.toastr.error("No se ha podido crear la actividad!");
        }
        this.gestionActividadesService.getListaActividades();
        this.formulario.reset();
      }
    )
  }

  editar(datosA: ActividadModel){
    datosA.Id_actividad = this.idActividad;
    this.gestionActividadesService.actualizarActividad(datosA).subscribe(data =>{
      if(data['Retcode'] === 0){
        this.toastr.success("Actividad modificada correctamente");
        this.store.dispatch(new EditarActividad(data));
      }else{
        this.toastr.error("No se ha podido modificar la actividad!");
      }
      this.gestionActividadesService.getListaActividades();
      this.formulario.reset();
      this.idActividad = undefined;
    });
  }

}
