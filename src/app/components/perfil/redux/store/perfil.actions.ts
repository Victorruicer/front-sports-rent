import { Action } from '@ngrx/store';

export enum PerfilActionTypes {
  RESERVAS_ACTIVAS = '[Perfil] Carga reservas activas',
  HISTORIAL_RESERVAS = '[Perfil] Historial reservas',
  INICIALIZA = '[Perfil] limpia reservas',
}

export class ReservasActivas implements Action {
  readonly type = PerfilActionTypes.RESERVAS_ACTIVAS;
  constructor(public payload: any) {}
}

export class HistorialReservas implements Action {
  readonly type = PerfilActionTypes.HISTORIAL_RESERVAS;
  constructor(public payload: any) {}
}

export class InicializaPerfil implements Action {
  readonly type = PerfilActionTypes.INICIALIZA;
}

export type PerfilActions =
  | ReservasActivas
  | InicializaPerfil
  | HistorialReservas;
