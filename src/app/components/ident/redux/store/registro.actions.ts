import { Action } from '@ngrx/store';

export enum RegistroActionTypes {
  RESET = '[Registro] Signup',
  REGISTRO_SUCCESS = '[Registro] Signup Success',
  REGISTRO_FAILURE = '[Registro] Signup Failure',
}

export class Registro implements Action {
  readonly type = RegistroActionTypes.RESET;
}

export class RegistroSuccess implements Action {
  readonly type = RegistroActionTypes.REGISTRO_SUCCESS;
  constructor(public payload: any) {}
}

export class RegistroFailure implements Action {
  readonly type = RegistroActionTypes.REGISTRO_FAILURE;
  constructor(public payload: any) {}
}


//export type AccionesLogin = SetLoginAction | UnsetLoginAction;
export type RegistroActions =
  | Registro
  | RegistroSuccess
  | RegistroFailure;
