import { Action } from '@ngrx/store';

export enum HorarioActionTypes {
  CREAR = '[Horario] Crear Horario',
  ELIMINAR = '[Horario] Eliminar Horario',
  EDITAR = '[Horario] Editar Horario',
  CARGA_HORARIOS = '[Horario] Carga Horarios',
  INICIALIZA = '[Horario] reset Horarios'
}

export class CrearHorario implements Action {
  readonly type = HorarioActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarHorario implements Action {
  readonly type = HorarioActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarHorario implements Action {
  readonly type = HorarioActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class CargaHorarios implements Action {
  readonly type = HorarioActionTypes.CARGA_HORARIOS;
  constructor(public payload: any) {}
}

export class InicializaHorarios implements Action {
  readonly type = HorarioActionTypes.INICIALIZA;
  constructor() {}
}

export type HorarioActions =
  | CrearHorario
  | EliminarHorario
  | EditarHorario
  | CargaHorarios
  | InicializaHorarios;
