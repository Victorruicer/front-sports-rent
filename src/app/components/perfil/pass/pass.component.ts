import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/auth.service';
import { ResetPass } from '../models/resetPass';

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.css']
})
export class PassComponent implements OnInit {

  formulario: FormGroup;
  resultado: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private toastr: ToastrService) { 

    this.formulario = this.fb.group({
      oldpass    : ['', Validators.required],
      newpass1   : ['',[Validators.required, Validators.minLength(4)]],
      newpass2   : ['', Validators.required],
    },{
      validators: this.passwordsIguales('newpass1','newpass2')
    });
  }

  ngOnInit(): void {
  }

  get newpass1NoValido(){
    return this.formulario.get('newpass1').invalid && this.formulario.get('newpass1').touched;
  }
  get newpass2NoValido(){
    const newpass1 = this.formulario.get('newpass1').value;
    const newpass2 = this.formulario.get('newpass2').value;

    return ( newpass1 === newpass2) ? false : true;
  }

  //Validadores
  passwordsIguales(newpass1Name:string, newpass2Name:string){
    return ( formGroup: FormGroup ) => {
      const newpass1Control = formGroup.controls[newpass1Name];
      const newpass2Control = formGroup.controls[newpass2Name];

      if(newpass1Control.value === newpass2Control.value){
        newpass2Control.setErrors(null);
      }else{
        newpass2Control.setErrors({noEsIgual: true});
      }
    }
  }

  resetear(){

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
    const datosPass: ResetPass = {
      Oldpass: this.formulario.get('oldpass')?.value,
      Newpass: this.formulario.get('newpass2')?.value
    }

  }
}
