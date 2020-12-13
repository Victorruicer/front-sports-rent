import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { TarifaModel } from '../models/TarifaModel';
import { GestionTarifasService } from '../gestion-tarifas.service';
import { CrearTarifa, EditarTarifa } from '../redux/store/tarifas.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crear-tarifa',
  templateUrl: './crear-tarifa.component.html',
  styleUrls: ['./crear-tarifa.component.css']
})
export class CrearTarifaComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  resultado: string;
  subscription: Subscription;
  upTarifa: TarifaModel;
  idTarifa = 0;

  constructor( private fb: FormBuilder,
              private store: Store<AppState>,
              public gestionTarifasService: GestionTarifasService,
              private toastr: ToastrService) 
  {
    this.formulario = this.fb.group({
      id       : 0,
      tarifa   : ['', [Validators.required, Validators.minLength(4)]],
      valor    : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.gestionTarifasService.obtenerTarifa$().subscribe(data =>{
      this.upTarifa = data;

      this.formulario.patchValue({
        tarifa: this.upTarifa.Tarifa,
        valor: this.upTarifa.Valor
      });
      this.idTarifa = this.upTarifa.Id_tarifa;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get tarifaNoValido(){
    return this.formulario.get('tarifa').invalid && this.formulario.get('tarifa').touched;
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
    const datosT: TarifaModel = {
      Tarifa: this.formulario.get('tarifa')?.value,
      Valor: this.formulario.get('valor')?.value,
    }

    if(this.idTarifa === undefined){
      this.crear(datosT);
    }else{
      this.editar(datosT);
    }
  }
    
  crear(datosT: TarifaModel){
    this.gestionTarifasService.crearTarifa(datosT).subscribe(
      data => {
        if(data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Tarifa creada correctamente");
          this.store.dispatch(new CrearTarifa(data));
        }else{
          this.toastr.error("No se ha podido crear la tarifa!");
        }
        this.gestionTarifasService.getListaTarifas();
        this.formulario.reset();
      }
    )
  }

  editar(datosT: TarifaModel){
    datosT.Id_tarifa = this.idTarifa;
    this.gestionTarifasService.actualizarTarifa(datosT).subscribe(data =>{
      if(data['Retcode'] === 0){
        this.toastr.success("Tarifa modificada correctamente");
        this.store.dispatch(new EditarTarifa(data));
      }else{
        this.toastr.error("No se ha podido modificar la tarifa!");
      }
      this.gestionTarifasService.getListaTarifas();
      this.formulario.reset();
      this.idTarifa = undefined;
    });
  }
}
