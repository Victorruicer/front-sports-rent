import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { TarifaModel } from '../models/TarifaModel';
import { GestionTarifasService } from '../gestion-tarifas.service';
import { CrearTarifa } from '../redux/store/tarifas.actions';

@Component({
  selector: 'app-crear-tarifa',
  templateUrl: './crear-tarifa.component.html',
  styleUrls: ['./crear-tarifa.component.css']
})
export class CrearTarifaComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;

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

    this.gestionTarifasService.crearTarifa(datosT).subscribe(
      data => {
        if(data['Id_Tarifa'] > 0 && data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Tarifa creada correctamente");
          this.store.dispatch(new CrearTarifa(data));
        }else{
          this.toastr.error("No se ha podido crear la tarifa!");
        }
        this.formulario.reset();
      })
  }
}
