import { Action } from '@ngrx/store';

export enum ReservaActionTypes {
  PISTAS_DISPONIBLES = '[Reserva] Carga pistas disponibles',
  HORAS_DISPONIBLES = '[Reserva] Carga horas disponibles',
}

export class PistasDisponibles implements Action {
  readonly type = ReservaActionTypes.PISTAS_DISPONIBLES;
  constructor(public payload: any) {}
}

export class HorasDisponibles implements Action {
  readonly type = ReservaActionTypes.HORAS_DISPONIBLES;
  constructor(public payload: any) {}
}


export type ReservaActions =

  | HorasDisponibles
  | PistasDisponibles;
