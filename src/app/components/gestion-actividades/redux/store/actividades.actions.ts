import { Action } from '@ngrx/store';

export enum ActividadActionTypes {
  CREAR = '[Actividad] Crear Actividad',
  ELIMINAR = '[Actividad] Eliminar Actividad',
  EDITAR = '[Actividad] Editar Actividad',
  CARGA_ACTIVIDADES = '[Actividad] Carga Actividades',
  INICIALIZA = '[Actividad] reset Actividades'
}

export class CrearActividad implements Action {
  readonly type = ActividadActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarActividad implements Action {
  readonly type = ActividadActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarActividad implements Action {
  readonly type = ActividadActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class CargaActividades implements Action {
  readonly type = ActividadActionTypes.CARGA_ACTIVIDADES;
  constructor(public payload: any) {}
}

export class InicializaActividades implements Action {
  readonly type = ActividadActionTypes.INICIALIZA;
  constructor() {}
}

export type ActividadActions =
  | CrearActividad
  | EditarActividad
  | EliminarActividad
  | CargaActividades
  | InicializaActividades;
