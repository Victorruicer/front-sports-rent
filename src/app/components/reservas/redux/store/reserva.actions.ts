import { Action } from '@ngrx/store';

export enum ReservaActionTypes {
  PISTAS_DISPONIBLES = '[Reserva] Carga pistas disponibles',
}

export class PistasDisponibles implements Action {
  readonly type = ReservaActionTypes.PISTAS_DISPONIBLES;
  constructor(public payload: any) {}
}


export type ReservaActions =

  | PistasDisponibles;
