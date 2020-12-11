import { InstalacionModel } from '../../models/InstalacionModel';
import { InstalacionActions, InstalacionActionTypes } from './instalaciones.actions';


export interface InstalacionState{
  instalaciones: InstalacionModel[] | null;
}
export const initialState: InstalacionState = {
  instalaciones: null
};


export function instalacionReducer(state = initialState, action: InstalacionActions): InstalacionState {
  switch (action.type) {
    case InstalacionActionTypes.CREAR: {
      return {
        ...state,
        instalaciones: [...state.instalaciones, action.payload]
      }
    }
    case InstalacionActionTypes.ELIMINAR: {
      return {
        ...state,
        instalaciones: state.instalaciones.filter(
          user => user.Id_Instalacion !== action.payload.id)
      };
    }
    case InstalacionActionTypes.EDITAR: {
      //Buscamos la posicion de la instalacion a modificar
      const index = state.instalaciones.findIndex(item => item.Id_Instalacion === action.payload.ID_Usuario);
      const array = [...state.instalaciones]; //Copiamos instalaciones a nuevo array
      array[index] = action.payload;
      return {//Devolvemos el nuevo state
        ...state,
        instalaciones: array
      }
    }
    case InstalacionActionTypes.CARGA_INSTALACIONES: {
      return {
        ...state,
        instalaciones: action.payload.lista
      }
    }
    case InstalacionActionTypes.INICIALIZA: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
