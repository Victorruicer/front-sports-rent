import { PistaActions, PistaActionTypes } from './pistas.actions';
import { PistaModel } from '../../models/PistaModel';


export interface PistaState{
  pistas: PistaModel[] | null;
}
export const initialState: PistaState = {
  pistas: null
};


export function pistaReducer(state = initialState, action: PistaActions): PistaState {
  switch (action.type) {
    case PistaActionTypes.CREAR: {
      return {
        ...state,
        pistas: [...state.pistas, action.payload]
      }
    }
    case PistaActionTypes.ELIMINAR: {
      return {
        ...state,
        pistas: state.pistas.filter(
          pista => pista.Id_pista !== action.payload.id)
      };
    }
    case PistaActionTypes.EDITAR: {
      //Buscamos la posicion de la pista a modificar
      const index = state.pistas.findIndex(item => item.Id_pista === action.payload.Id_pista);
      const array = [...state.pistas]; //Copiamos pistas a nuevo array
      array[index] = action.payload;
      return {//Devolvemos el nuevo state
        ...state,
        pistas: array
      }
    }
    case PistaActionTypes.CARGA_PISTAS: {
      return {
        ...state,
        pistas: action.payload.lista
      }
    }
    case PistaActionTypes.INICIALIZA: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
