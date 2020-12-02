import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../models/UserModel';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  Imagen: string = "data:image/png;base64,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";

  constructor( private fb: FormBuilder) { 

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
  get password1NoValido(){
    return this.formulario.get('password1').invalid && this.formulario.get('password1').touched;
  }
  get password2NoValido(){
    const password1 = this.formulario.get('password1').value;
    const password2 = this.formulario.get('password2').value;

    return ( password1 === password2) ? false : true;
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
      password1: ['',[Validators.required, Validators.minLength(4)]],
      password2: ['', Validators.required],
    },{
      validators: this.passwordsIguales('password1','password2') && this.perfilDefault('id_perfil')
    });
  }

  //Validadores
  passwordsIguales(password1Name:string, password2Name:string){
    return ( formGroup: FormGroup ) => {
      const password1Control = formGroup.controls[password1Name];
      const password2Control = formGroup.controls[password2Name];

      if(password1Control.value === password2Control.value){
        password2Control.setErrors(null);
      }else{
        password2Control.setErrors({noEsIgual: true});
      }
    }
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
  crear(){

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
      ID_Usuario: null,
      Nombre: this.formulario.get('nombre')?.value,
      Apellido1: this.formulario.get('apellido1')?.value,
      Apellido2: this.formulario.get('apellido2')?.value,
      Dni: this.formulario.get('dni')?.value,
      Email: this.formulario.get('email')?.value,
      Password: this.formulario.get('password2')?.value,
      Id_Perfil: this.formulario.get('id_perfil')?.value,
      Imagen: this.Imagen
    }
    
  }
}
