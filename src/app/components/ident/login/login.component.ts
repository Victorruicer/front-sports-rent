import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosLogin } from '../models/datosLogin';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router) {

    this.formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
  }

  get emailNoValido(){
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }
  get passwordNoValido(){
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }

  login(){

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
    const datosL: DatosLogin = {
      Email: this.formulario.get('email')?.value,
      Password: this.formulario.get('password')?.value
    }
    this.auth.comprobarLogin(datosL).subscribe(data => {
      if(data.Token != null){
        this.resultado = "Usuario logado: " + data.Email;
        this.router.navigateByUrl('/home');
      }else{
        this.resultado = data.mensaje;
      }

      this.formulario.reset();
    })

  }
}
