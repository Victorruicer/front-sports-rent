import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DatosLogin } from '../../ident/models/datosLogin';
import { PerfilService } from '../perfil.service';
import { AppState } from '../../../app.reducer';
import { UpdateCurrentUser } from '../../ident/redux/store/login.actions';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  Imagen: any;
  usuario: DatosLogin;
  mensaje: string = null;

  constructor(private fb:FormBuilder,
             private perfilService: PerfilService,
             private store: Store<AppState>) {

  }

  ngOnInit(): void {
    //Nos subscribimos a la propiedad login del AppState para mantener la vista actualizada
    this.store.select('login').subscribe(currentUser => {
      //si hay usuario logado
      if(currentUser.isAuthenticated){
        //Cargamos datos del usuario
        this.usuario = currentUser.user;
        this.Imagen = currentUser.user.Imagen;
      }
    });

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
      if(datos['Retcode'] === 0){
        console.log("usuario actualizado = "+datos['Email']);
        this.store.dispatch(new UpdateCurrentUser({user: datosM}))
        this.resultado = datos['Email'] + " actualizado correctamente.";
      }else{
        this.resultado = datos['Mensaje'];
      }

    })

  }
}
