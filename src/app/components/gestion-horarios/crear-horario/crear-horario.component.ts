import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { GestionHorariosService } from '../gestion-horarios.service';
import { HorarioModel } from '../models/HorarioModel';
import { CrearHorario, EditarHorario } from '../redux/store/horario.actions';

@Component({
  selector: 'app-crear-horario',
  templateUrl: './crear-horario.component.html',
  styleUrls: ['./crear-horario.component.css']
})
export class CrearHorarioComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  subscription: Subscription;
  upHorario: HorarioModel;
  idHorario = 0;

  constructor( private fb: FormBuilder,
              private store: Store<AppState>,
              public gestionHorariosService: GestionHorariosService,
              private toastr: ToastrService) 
  {
    this.formulario = this.fb.group({
      id       : 0,
      nombre   : ['', [Validators.required, Validators.minLength(4)]],
      horario    : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.gestionHorariosService.obtenerHorario$().subscribe(data =>{
      this.upHorario = data;

      this.formulario.patchValue({
        nombre: this.upHorario.Nombre,
        horario: this.upHorario.Horario
      });
      this.idHorario = this.upHorario.Id_horario;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get horarioNoValido(){
    return this.formulario.get('horario').invalid && this.formulario.get('horario').touched;
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
    const datosH: HorarioModel = {
      Nombre: this.formulario.get('nombre')?.value,
      Horario: this.formulario.get('horario')?.value,
    }

    if(this.idHorario === undefined){
      this.crear(datosH);
    }else{
      this.editar(datosH);
    }
  }
    
  crear(datosH: HorarioModel){
    this.gestionHorariosService.crearHorario(datosH).subscribe(
      data => {
        if(data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Horario creado correctamente");
          this.store.dispatch(new CrearHorario(data));
        }else{
          this.toastr.error("No se ha podido crear el horario!");
        }
        this.gestionHorariosService.getListaHorarios();
        this.formulario.reset();
      }
    )
  }

  editar(datosH: HorarioModel){
    datosH.Id_horario = this.idHorario;
    this.gestionHorariosService.actualizarHorario(datosH).subscribe(data =>{
      if(data['Retcode'] === 0){
        this.toastr.success("Horario modificado correctamente");
        this.store.dispatch(new EditarHorario(data));
      }else{
        this.toastr.error("No se ha podido modificar el horario!");
      }
      this.gestionHorariosService.getListaHorarios();
      this.formulario.reset();
      this.idHorario = undefined;
    });
  }
}