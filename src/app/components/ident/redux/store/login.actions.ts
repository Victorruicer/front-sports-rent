import { Action } from '@ngrx/store';

export enum AuthenticationActionTypes {
  LOGIN = '[Authentication] Login',
  LOGIN_SUCCESS = '[Authentication] Login Success',
  LOGIN_FAILURE = '[Authentication] Login Failure',
  LOGOUT = '[Authentication] Logout',
  UPDATE_CURRENT_USER = '[Authentication] update current user',
  GET_STATUS = '[Authentication] GetStatus',
}

export class Login implements Action {
  readonly type = AuthenticationActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateCurrentUser implements Action {
  readonly type = AuthenticationActionTypes.UPDATE_CURRENT_USER;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = AuthenticationActionTypes.LOGOUT;
}

export class GetStatus implements Action {
  readonly type = AuthenticationActionTypes.GET_STATUS;
}

//export type AccionesLogin = SetLoginAction | UnsetLoginAction;
export type AuthenticationActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | UpdateCurrentUser
  | Logout
  | GetStatus;
