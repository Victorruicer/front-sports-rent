import { Action } from '@ngrx/store';

export enum RegistroActionTypes {
  REGISTRO_SUCCESS = '[Registro] Signup Success',
  REGISTRO_FAILURE = '[Registro] Signup Failure',
  INICIALIZA = '[Registro] Limpia Registro',
}

export class RegistroSuccess implements Action {
  readonly type = RegistroActionTypes.REGISTRO_SUCCESS;
  constructor(public payload: any) {}
}

export class RegistroFailure implements Action {
  readonly type = RegistroActionTypes.REGISTRO_FAILURE;
  constructor(public payload: any) {}
}

export class InicializaRegistro implements Action {
  readonly type = RegistroActionTypes.INICIALIZA;
}


//export type AccionesLogin = SetLoginAction | UnsetLoginAction;
export type RegistroActions =
  | RegistroSuccess
  | RegistroFailure
  | InicializaRegistro;
