import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DatosLogin } from '../ident/models/datosLogin';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  IdPerfil: number = 3;
  Imagen: string;
  usuario: DatosLogin;
  Archivo: File = null;

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) {

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
      dni: [this.usuario.Dni, Validators.required],
      email: [this.usuario.Email, Validators.required],
      imagen: [this.usuario.Imagen],
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

  cambiarImagen(files: FileList){
    this.Archivo = files.item(0);
/*     if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            this.Imagen = fr.result;
        }
        fr.readAsDataURL(files[0]);
    } */
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
      Nombre: this.formulario.get('nombre')?.value,
      Apellido1: this.formulario.get('apellido1')?.value,
      Apellido2: this.formulario.get('apellido2')?.value,
      Imagen: this.Imagen
    }

    // this.auth.registro(datosR).subscribe(data => {
    //   if(data.Nombre != null){
    //     this.resultado = data.Nombre + " te has registrado correctamente, ya puedes inciar sesión"
    //   }else{
    //     this.resultado = data.Mensaje;
    //   }
    // })

  }
}
