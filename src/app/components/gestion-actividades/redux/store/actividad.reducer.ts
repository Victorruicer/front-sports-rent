import { ActividadActions, ActividadActionTypes } from './actividades.actions';
import { ActividadModel } from '../../models/actividadModel';


export interface ActividadState{
  actividades: ActividadModel[] | null;
}
export const initialState: ActividadState = {
  actividades: null
};


export function actividadReducer(state = initialState, action: ActividadActions): ActividadState {
  switch (action.type) {
    case ActividadActionTypes.CREAR: {
      return {
        ...state,
        actividades: [...state.actividades, action.payload]
      }
    }
    case ActividadActionTypes.ELIMINAR: {
      return {
        ...state,
        actividades: state.actividades.filter(
          actividad => actividad.Id_actividad !== action.payload.id)
      };
    }
    case ActividadActionTypes.EDITAR: {
      //Buscamos la posicion de la tarifa a modificar
      const index = state.actividades.findIndex(item => item.Id_actividad === action.payload.Id_actividad);
      const array = [...state.actividades]; //Copiamos actividades a nuevo array
      array[index] = action.payload;
      return {//Devolvemos el nuevo state
        ...state,
        actividades: array
      }
    }
    case ActividadActionTypes.CARGA_ACTIVIDADES: {
      return {
        ...state,
        actividades: action.payload.lista
      }
    }
    case ActividadActionTypes.INICIALIZA: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
