import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosLogin } from '../models/datosLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  resultado: string = "si";

  constructor( private fb: FormBuilder) { 

    this.formulario = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(){
    const datosL: DatosLogin = {
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password2')?.value
    }
  }
}
