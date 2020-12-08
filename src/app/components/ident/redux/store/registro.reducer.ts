import { DatosLogin } from '../../models/datosLogin';
import { RegistroActions, RegistroActionTypes } from './registro.actions';

export interface RegistroState {
  isRegistered: boolean;
  user: DatosLogin | null;
  errorMessage: string | null;
}

//set the initial state with localStorage
export const initialState: RegistroState = {
  isRegistered: false,
  user: {
          Nombre: null,
          Apellido1: null,
          Email: null
        },
  errorMessage: null
};

export function registroReducer(state = initialState, action: RegistroActions): RegistroState {
  switch (action.type) {
    case RegistroActionTypes.REGISTRO_SUCCESS: {
      return {
        ...state,
        isRegistered: true,
        user: {
          Nombre: action.payload.Nombre,
          Apellido1: action.payload.Apellido1,
          Email: action.payload.email
        },
        errorMessage: null
      };
    }
    case RegistroActionTypes.REGISTRO_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.message
      };
    }
    case RegistroActionTypes.RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
