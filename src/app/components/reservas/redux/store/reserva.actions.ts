import { Action } from '@ngrx/store';

export enum ReservaActionTypes {
  PISTAS_DISPONIBLES = '[Reserva] Carga pistas disponibles',
  HORAS_DISPONIBLES = '[Reserva] Carga horas disponibles',
  EN_RESERVA = '[Reserva] Carga reserva en tramite',
}

export class PistasDisponibles implements Action {
  readonly type = ReservaActionTypes.PISTAS_DISPONIBLES;
  constructor(public payload: any) {}
}

export class HorasDisponibles implements Action {
  readonly type = ReservaActionTypes.HORAS_DISPONIBLES;
  constructor(public payload: any) {}
}

export class EnReserva implements Action {
  readonly type = ReservaActionTypes.EN_RESERVA;
  constructor(public payload: any) {}
}

export type ReservaActions =

  | EnReserva
  | HorasDisponibles
  | PistasDisponibles;
