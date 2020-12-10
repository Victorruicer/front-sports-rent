import { PerfilActions, PerfilActionTypes } from './perfil.actions';
import { ReservasUser } from '../../models/reservasUser';


export interface PerfilState {
  reservasActivas: ReservasUser[] | null;
  historialReservas: ReservasUser[] | null;
}

//set the initial state with localStorage
export const initialState: PerfilState = {
  reservasActivas: null,
  historialReservas: null
};

export function perfilReducer(state = initialState, action: PerfilActions): PerfilState {
  switch (action.type) {
    case PerfilActionTypes.RESERVAS_ACTIVAS: {
      return {
        ...state,
        reservasActivas: action.payload.lista
      };
    }
    case PerfilActionTypes.HISTORIAL_RESERVAS: {
      return {
        ...state,
        historialReservas: action.payload.lista
      };
    }
    case PerfilActionTypes.INICIALIZA: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
