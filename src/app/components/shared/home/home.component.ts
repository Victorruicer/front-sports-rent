import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { GestionUsuariosService } from '../../gestion-usuarios/gestion-usuarios.service';
import { CargaUsers } from '../../gestion-usuarios/redux/store/usuario.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;

  constructor(private fb:FormBuilder,
              private store: Store<AppState>,
              private gestionUsuariosService: GestionUsuariosService) {

    this.formulario = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(4)]],
      email    : ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  this.gestionUsuariosService.getUsuarios().subscribe(usuarios => {
    console.log("lista de usuarios: ->> " + usuarios);
    this.store.dispatch(new CargaUsers({lista: usuarios}));
    })
  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get emailNoValido(){
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }
  get mensajeNoValido(){
    return this.formulario.get('mensaje').invalid && this.formulario.get('mensaje').touched;
  }

  enviar(){
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
    const datosR = {
      Nombre: this.formulario.get('nombre')?.value,
      Email: this.formulario.get('email')?.value,
      Mensaje: this.formulario.get('mensaje')?.value
    }

  }
}
