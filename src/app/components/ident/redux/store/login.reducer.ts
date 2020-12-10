import { DatosLogin } from '../../models/datosLogin';
import { AuthenticationActionTypes, AuthenticationActions } from './login.actions';

export interface LoginState {
  isAuthenticated: boolean;
  user: DatosLogin | null;
  errorMessage: string | null;
}

//set the initial state with localStorage
export const initialState: LoginState = {
  isAuthenticated: false,
  user: {
    Id_Usuario: null,
    Nombre: null,
    Apellido1: null,
    Apellido2: null,
    Dni: null,
    Email: null,
    Id_Perfil: null,
    Imagen: null,
    Token: null
  },
  errorMessage: null
};

export function loginReducer(state = initialState, action: AuthenticationActions): LoginState {
  switch (action.type) {
    case AuthenticationActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthenticationActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.message
      };
    }
    case AuthenticationActionTypes.UPDATE_CURRENT_USER:{
      var objetoUser = {...state.user};
      objetoUser.Nombre = action.payload.user.Nombre;
      objetoUser.Apellido1 = action.payload.user.Apellido1;
      objetoUser.Apellido2 = action.payload.user.Apellido2;
      objetoUser.Imagen = action.payload.user.Imagen;
      return{
        ...state,
        user: objetoUser
      };
    }
    case AuthenticationActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
