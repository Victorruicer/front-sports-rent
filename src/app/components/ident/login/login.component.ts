import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosLogin } from '../models/datosLogin';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectLoginState } from '../../../app.reducer';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;
  user: DatosLogin;
  getState: Observable<any>;
  isAuthenticated: boolean = false;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private router: Router,
               private store: Store<AppState>,
               private toastr: ToastrService) {
    this.getState = this.store.select(selectLoginState);
    this.formulario = this.fb.group({
      email: ['', Validators.required],
      password: ['',[Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
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
      console.log(data);
      if(data.Token != null && data.Email == datosL.Email){//login correcto
        this.toastr.success("Logado correctamente");
        this.resultado = "Usuario logado: " + data.Email;
        this.router.navigateByUrl('/home');
      }else{
        this.resultado = data.Mensaje;
        this.toastr.error(data.Mensaje);
      }

      this.formulario.reset();
    })

  }
}
