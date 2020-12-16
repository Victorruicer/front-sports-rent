import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { GestionHorariosService } from '../../gestion-horarios/gestion-horarios.service';
import { GestionInstalacionesService } from '../gestion-instalaciones.service';
import { InstalacionModel } from '../models/InstalacionModel';
import { HorarioModel } from '../../gestion-horarios/models/HorarioModel';
import { CrearInstalacion, EditarInstalacion } from '../redux/store/instalaciones.actions';

@Component({
  selector: 'app-crear-instalacion',
  templateUrl: './crear-instalacion.component.html',
  styleUrls: ['./crear-instalacion.component.css']
})
export class CrearInstalacionComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  resultado: string;
  Imagen: any;
  ImagenCargada: string;
  instalacion: InstalacionModel;
  mensaje: string = null;
  horarios: HorarioModel[];
  subscription: Subscription;
  upInstalacion: InstalacionModel;
  idInstalacion = 0;

  constructor(private fb:FormBuilder,
             public gestionInstalacionesService: GestionInstalacionesService,
             public gestionHorariosService: GestionHorariosService,
             private store: Store<AppState>,
             private toastr: ToastrService) {
    this.formulario = this.fb.group({
      nombre    : ['', [Validators.required, Validators.minLength(4)]],
      direccion : ['', Validators.required],
      horario   : [0, Validators.required],
      imagen    : ['']
    });

  }

  ngOnInit(): void {

    //this.formulario.setValue(this.formulario.get('op'));
    this.store.select('horario').subscribe(
      horarios => {
        this.horarios = horarios.horario
        console.log(this.horarios)
      }
    )
    this.subscription = this.gestionInstalacionesService.obtenerInstalacion$().subscribe(data =>{
      this.upInstalacion = data;
      console.log("instalaciones = "+this.upInstalacion.Id_horario)
      this.formulario.patchValue({
        nombre: this.upInstalacion.Nombre,
        direccion: this.upInstalacion.Direccion,
        horario: this.upInstalacion.Id_horario,
        imagen: this.upInstalacion.Imagen
      });
      this.idInstalacion = this.upInstalacion.Id_instalacion;
      this.ImagenCargada = this.upInstalacion.Imagen;

      //Para la primera vez que carga el formulario
      if(this.idInstalacion === undefined){
        this.formulario.patchValue({
          horario: 0,
        });
      }
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get direccionNoValido(){
    return this.formulario.get('direccion').invalid && this.formulario.get('direccion').touched;
  }
  get horarioNoValido(){
    return this.formulario.get('horario').invalid && this.formulario.get('horario').touched;
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

  actualizar(){

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
    const datosI: InstalacionModel = {
      Instalacion: this.formulario.get('nombre')?.value,
      Direccion: this.formulario.get('direccion')?.value,
      Id_Horario: this.formulario.get('horario').value,
      Imagen: this.Imagen
    }
    if(this.idInstalacion === undefined){
      this.crear(datosI);
    }else{
      this.editar(datosI);
    }
  }

  crear(datosI: InstalacionModel){

    this.gestionInstalacionesService.crearInstalacion(datosI).subscribe(
      data => {
        if(data['Retcode'] === 0){
          console.log("creado ok");
          this.toastr.success("Instalación creada correctamente");
          this.store.dispatch(new CrearInstalacion(data));
        }else{
          this.toastr.error("No se ha podido crear la instalación!");
        }
        this.gestionInstalacionesService.getListaInstalaciones();
        this.formulario.reset();
        this.formulario.patchValue({
          horario: 0
        })
      })
    }



  editar(datosI: InstalacionModel){
    datosI.Id_instalacion = this.idInstalacion;
    this.gestionInstalacionesService.actualizarInstalacion(datosI).subscribe(data =>{
      if(data['Retcode'] === 0){
        this.toastr.success("Instalación modificada correctamente");
        this.store.dispatch(new EditarInstalacion(data));
      }else{
        this.toastr.error("No se ha podido modificar la instalación!");
      }
      this.gestionInstalacionesService.getListaInstalaciones();
      this.formulario.reset();
      this.formulario.patchValue({
          horario: 0
        })
      this.idInstalacion = undefined;
    });
  }

}
