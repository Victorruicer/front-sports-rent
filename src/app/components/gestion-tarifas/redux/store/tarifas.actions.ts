import { Action } from '@ngrx/store';

export enum TarifaActionTypes {
  CREAR = '[Tarifa] Crear Tarifa',
  ELIMINAR = '[Tarifa] Eliminar Tarifa',
  EDITAR = '[Tarifa] Editar Tarifa',
  CARGA_TARIFAS = '[Tarifa] Carga Tarifas',
  INICIALIZA = '[Tarifa] reset Tarifas'
}

export class CrearTarifa implements Action {
  readonly type = TarifaActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarTarifa implements Action {
  readonly type = TarifaActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarTarifa implements Action {
  readonly type = TarifaActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class CargaTarifas implements Action {
  readonly type = TarifaActionTypes.CARGA_TARIFAS;
  constructor(public payload: any) {}
}

export class InicializaTarifas implements Action {
  readonly type = TarifaActionTypes.INICIALIZA;
  constructor() {}
}

export type TarifaActions =
  | CrearTarifa
  | EditarTarifa
  | EliminarTarifa
  | CargaTarifas
  | InicializaTarifas;
