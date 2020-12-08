import { Action } from '@ngrx/store';

export enum UserActionTypes {
  CREAR = '[User] Crear User',
  ELIMINAR = '[User] Eliminar User',
  EDITAR = '[User] Editar User',
  CARGA_USERS = '[User] Carga Users',
  INICIALIZA = '[User] reset Users'
}

export class CrearUser implements Action {
  readonly type = UserActionTypes.CREAR;
  constructor(public payload: any) {}
}

export class EliminarUser implements Action {
  readonly type = UserActionTypes.ELIMINAR;
  constructor(public payload: any) {}
}

export class EditarUser implements Action {
  readonly type = UserActionTypes.EDITAR;
  constructor(public payload: any) {}
}

export class CargaUsers implements Action {
  readonly type = UserActionTypes.CARGA_USERS;
  constructor(public payload: any) {}
}

export class InicializaUsers implements Action {
  readonly type = UserActionTypes.INICIALIZA;
  constructor() {}
}

export type UserActions =
  | CrearUser
  | EditarUser
  | EliminarUser
  | CargaUsers
  | InicializaUsers;
