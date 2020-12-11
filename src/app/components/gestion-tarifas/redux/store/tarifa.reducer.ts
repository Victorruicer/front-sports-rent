import { TarifaActions, TarifaActionTypes } from './tarifas.actions';
import { TarifaModel } from '../../models/TarifaModel';


export interface TarifaState{
  tarifas: TarifaModel[] | null;
}
export const initialState: TarifaState = {
  tarifas: null
};


export function tarifaReducer(state = initialState, action: TarifaActions): TarifaState {
  switch (action.type) {
    case TarifaActionTypes.CREAR: {
      return {
        ...state,
        tarifas: [...state.tarifas, action.payload]
      }
    }
    case TarifaActionTypes.ELIMINAR: {
      return {
        ...state,
        tarifas: state.tarifas.filter(
          user => user.Id_Tarifa !== action.payload.id)
      };
    }
    case TarifaActionTypes.EDITAR: {
      //Buscamos la posicion de la tarifa a modificar
      const index = state.tarifas.findIndex(item => item.Id_Tarifa === action.payload.ID_Usuario);
      const array = [...state.tarifas]; //Copiamos tarifas a nuevo array
      array[index] = action.payload;
      return {//Devolvemos el nuevo state
        ...state,
        tarifas: array
      }
    }
    case TarifaActionTypes.CARGA_TARIFAS: {
      return {
        ...state,
        tarifas: action.payload.lista
      }
    }
    case TarifaActionTypes.INICIALIZA: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
