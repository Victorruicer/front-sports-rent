import { Action } from '@ngrx/store';

export enum PistaActionTypes {
  CREAR = '[Pista] Crear Pista',
  ELIMINAR = '[Pista] Eliminar Pista',
  EDITAR = '[Pista] Editar Pista',
  CARGA_PISTAS = '[Pista] Carga Pistas',
  INICIALIZA = '[Pista] reset Pistas'
}

export class CrearPista implements Action {
  readonly type = PistaActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarPista implements Action {
  readonly type = PistaActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarPista implements Action {
  readonly type = PistaActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class CargaPistas implements Action {
  readonly type = PistaActionTypes.CARGA_PISTAS;
  constructor(public payload: any) {}
}

export class InicializaPistas implements Action {
  readonly type = PistaActionTypes.INICIALIZA;
  constructor() {}
}

export type PistaActions =
  | CrearPista
  | EditarPista
  | EliminarPista
  | CargaPistas
  | InicializaPistas;
