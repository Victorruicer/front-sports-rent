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
  private Imagen:string = "";

  constructor( private fb: FormBuilder) { 

    this.crearFormulario();
  }
  
  ngOnInit(): void {

  }


  //Cargar Imagen
  onUploadFinished(event){
    this.Imagen = event.src;
    console.log(this.Imagen);
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
      apellido1: ['', [Validators.required, Validators.minLength(4)]],
      apellido2: ['', [Validators.required, Validators.minLength(4)]],
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
