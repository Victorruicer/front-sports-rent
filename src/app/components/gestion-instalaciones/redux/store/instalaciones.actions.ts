import { Action } from '@ngrx/store';

export enum InstalacionActionTypes {
  CREAR = '[Instalacion] Crear Instalacion',
  ELIMINAR = '[Instalacion] Eliminar Instalacion',
  EDITAR = '[Instalacion] Editar Instalacion',
  CARGA_INSTALACIONES = '[Instalacion] Carga Instalaciones',
  INICIALIZA = '[Instalacion] reset Instalaciones'
}

export class CrearInstalacion implements Action {
  readonly type = InstalacionActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarInstalacion implements Action {
  readonly type = InstalacionActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarInstalacion implements Action {
  readonly type = InstalacionActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class CargaInstalaciones implements Action {
  readonly type = InstalacionActionTypes.CARGA_INSTALACIONES;
  constructor(public payload: any) {}
}

export class InicializaInstalaciones implements Action {
  readonly type = InstalacionActionTypes.INICIALIZA;
  constructor() {}
}

export type InstalacionActions =
  | CrearInstalacion
  | EditarInstalacion
  | EliminarInstalacion
  | CargaInstalaciones
  | InicializaInstalaciones;
