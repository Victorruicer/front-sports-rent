import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/UserModel';
import { GestionUsuariosService } from '../gestion-usuarios.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ToastrService } from 'ngx-toastr';
import { CrearUser } from '../redux/store/usuario.actions';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;

  constructor( private fb: FormBuilder,
              private store: Store<AppState>,
              private gestionUsuariosService: GestionUsuariosService,
              private toastr: ToastrService) {

    this.crearFormulario();
  }

  ngOnInit(): void {

  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get apellido1NoValido(){
    return this.formulario.get('apellido1').invalid && this.formulario.get('apellido1').touched;
  }
  get apellido2NoValido(){
    return this.formulario.get('apellido2').invalid && this.formulario.get('apellido2').touched;
  }
  get dniNoValido(){
    return this.formulario.get('dni').invalid && this.formulario.get('dni').touched;
  }
  get perfilNoValido(){
    return this.formulario.get('id_perfil').invalid && this.formulario.get('id_perfil').touched;
  }
  get emailNoValido(){
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }

  crearFormulario(){

    this.formulario = this.fb.group({
      id       : 0,
      nombre   : ['', [Validators.required, Validators.minLength(4)]],
      apellido1: ['', [Validators.required, Validators.minLength(2)]],
      apellido2: ['', [Validators.required, Validators.minLength(2)]],
      dni      : ['',[Validators.required, Validators.pattern('')]],
      id_perfil: [0, Validators.required],
      email    : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    },{
      validators: this.perfilDefault('id_perfil')
    });
  }

  perfilDefault(perfilValue){
    return ( formGroup: FormGroup ) => {
      const idPerfilControl = formGroup.controls[perfilValue];

      if(idPerfilControl.value === 0){
        idPerfilControl.setErrors({default: true});
      }
    }
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
    const datosL: UserModel = {
      Nombre: this.formulario.get('nombre')?.value,
      Apellido1: this.formulario.get('apellido1')?.value,
      Apellido2: this.formulario.get('apellido2')?.value,
      Dni: this.formulario.get('dni')?.value,
      Email: this.formulario.get('email')?.value,
      Id_Perfil: this.formulario.get('id_perfil')?.value,
    }

    this.gestionUsuariosService.crearUsuario(datosL).subscribe(
      data => {
        if(data['Id_Usuario'] > 0 && data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Usuario creado correctamente");
          this.store.dispatch(new CrearUser(data));
        }else{
          this.toastr.error("No se ha podido crear el usuario");
        }
        this.formulario.reset();
      })
  }
}
