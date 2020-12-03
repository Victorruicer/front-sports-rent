import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageUploadService } from 'angular2-image-upload/lib/image-upload.service';
import { AuthService } from '../auth/auth.service';
import { DatosLogin } from '../ident/models/datosLogin';
import { PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  Imagen;
  usuario: DatosLogin;
  mensaje: string = null;

  constructor(private fb:FormBuilder,
             private auth:AuthService,
             private router:Router,
             private perfilService: PerfilService) {

  }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      //Si no hay ningún usuario logado se vuelve al home
      if(user == null){
        this.router.navigateByUrl('#');
      }else{
        this.usuario = user;
        this.Imagen = user.Imagen;
      }
    })

    this.formulario = this.fb.group({
      nombre   : [this.usuario.Nombre, [Validators.required, Validators.minLength(4)]],
      apellido1: [this.usuario.Apellido1, [Validators.required, Validators.minLength(2)]],
      apellido2: [this.usuario.Apellido2, [Validators.required, Validators.minLength(2)]],
      dni      : [this.usuario.Dni, Validators.required],
      email    : this.usuario.Email,
      imagen   : this.usuario.Imagen
    });
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

  cambiarImagen(event){
    //Comprobamos que solo haya 1 fichero
    const files = event.target.files;
    if(files.length === 0){
      return
    }

    //Comprobamos que el fichero sea una imagen
    const mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null){
      this.mensaje = "¡Solo se pueden introducir imágenes!";
      return;
    }else{
      this.mensaje = null;
    }

    //Cargamos la imagen
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.Imagen = reader.result;
    }
  }

  modificar(){

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
    const datosM: DatosLogin = {
      Id_Usuario: this.usuario.Id_Usuario,
      Nombre: this.formulario.get('nombre')?.value,
      Apellido1: this.formulario.get('apellido1')?.value,
      Apellido2: this.formulario.get('apellido2')?.value,
      Id_Perfil: this.usuario.Id_Perfil,
      Imagen: this.Imagen
    }

    this.perfilService.updateUser(datosM).subscribe(datos => {
      if(datos['Email'] != null){
        console.log("usuario actualizado = "+datos['Email']);
        var currentUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUser[0].Nombre = datosM.Nombre;
        currentUser[0].Apellido1 = datosM.Apellido1;
        currentUser[0].Apellido2 = datosM.Apellido2;
        currentUser[0].Imagen = datosM.Imagen;
        localStorage.setItem("currentUser",JSON.stringify(currentUser));
        this.resultado = datos['Email'] + " actualizado correctamente.";
      }else{
        this.resultado = datos['Mensaje'];
      }

    })
    // this.auth.registro(datosR).subscribe(data => {
    //   if(data.Nombre != null){
    //     this.resultado = data.Nombre + " te has registrado correctamente, ya puedes inciar sesión"
    //   }else{
    //     this.resultado = data.Mensaje;
    //   }
    // })

  }
}
