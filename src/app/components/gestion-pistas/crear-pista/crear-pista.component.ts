import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { GestionActividadesService } from '../../gestion-actividades/gestion-actividades.service';
import { GestionInstalacionesService } from '../../gestion-instalaciones/gestion-instalaciones.service';
import { GestionTarifasService } from '../../gestion-tarifas/gestion-tarifas.service';
import { GestionPistasService } from '../gestion-pistas.service';
import { PistaModel } from '../models/PistaModel';
import { CrearPista, EditarPista } from '../redux/store/pistas.actions';

@Component({
  selector: 'app-crear-pista',
  templateUrl: './crear-pista.component.html',
  styleUrls: ['./crear-pista.component.css']
})
export class CrearPistaComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  subscription: Subscription;
  upPista: PistaModel;
  idPista = 0;

  constructor( private fb: FormBuilder,
              private store: Store<AppState>,
              public gestionPistasService: GestionPistasService,
              public gestionInstalacionesService: GestionInstalacionesService,
              public gestionTarifasService: GestionTarifasService,
              public gestionActividadesService: GestionActividadesService,
              private toastr: ToastrService) 
  {
    this.formulario = this.fb.group({
      id          : 0,
      nombre      : ['', [Validators.required, Validators.minLength(4)]],
      instalacion : ['', Validators.required],
      tarifa      : ['', Validators.required],
      actividad   : ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.gestionInstalacionesService.getListaInstalaciones();
    this.gestionTarifasService.getListaTarifas();
    this.gestionActividadesService.getListaActividades();
    this.subscription = this.gestionPistasService.obtenerPista$().subscribe(data =>{
      this.upPista = data;

      this.formulario.patchValue({
        nombre: this.upPista.Nombre,
        instalacion: this.upPista.Id_instalacion,
        tarifa: this.upPista.Id_tarifa,
        actividad: this.upPista.Id_actividad
      });
      this.idPista = this.upPista.Id_pista;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get instalacionNoValido(){
    return this.formulario.get('instalacion').invalid && this.formulario.get('instalacion').touched;
  }
  get tarifaNoValido(){
    return this.formulario.get('tarifa').invalid && this.formulario.get('tarifa').touched;
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
    const datosP: PistaModel = {
      Nombre: this.formulario.get('nombre')?.value,
      Instalacion: this.formulario.get('instalacion')?.value,
      Tarifa: this.formulario.get('tarifa')?.value,
      Actividad: this.formulario.get('actividad')?.value,
    }

    if(this.idPista === undefined){
      this.crear(datosP);
    }else{
      this.editar(datosP);
    }
  }
    
  crear(datosP: PistaModel){
    this.gestionPistasService.crearPista(datosP).subscribe(
      data => {
        if(data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Pista creada correctamente");
          this.store.dispatch(new CrearPista(data));
        }else{
          this.toastr.error("No se ha podido crear la pista!");
        }
        this.gestionPistasService.getListaPistas();
        this.formulario.reset();
      }
    )
  }

  editar(datosP: PistaModel){
    datosP.Id_tarifa = this.idPista;
    this.gestionPistasService.actualizarPista(datosP).subscribe(data =>{
      if(data['Retcode'] === 0){
        this.toastr.success("Pista modificada correctamente");
        this.store.dispatch(new EditarPista(data));
      }else{
        this.toastr.error("No se ha podido modificar la pista!");
      }
      this.gestionPistasService.getListaPistas();
      this.formulario.reset();
      this.idPista = undefined;
    });
  }
}

