import { HorarioModel } from "../../models/HorarioModel";
import { HorarioActions, HorarioActionTypes } from "./horario.actions";



export interface HorarioState{
  horario: HorarioModel[] | null;
}
export const initialState: HorarioState = {
  horario: null
};


export function horarioReducer(state = initialState, action: HorarioActions): HorarioState {
  switch (action.type) {
    case HorarioActionTypes.CREAR: {
      return {
        ...state,
        horario: [...state.horario, action.payload]
      }
    }
    case HorarioActionTypes.ELIMINAR: {
      return {
        ...state,
        horario: state.horario.filter(
          h => h.Id_horario !== action.payload.id)
      };
    }
    case HorarioActionTypes.EDITAR: {
      //Buscamos la posicion de la Horario a modificar
      const index = state.horario.findIndex(item => item.Id_horario === action.payload.Id_Horario);
      const array = [...state.horario]; //Copiamos Horarioes a nuevo array
      array[index] = action.payload;
      return {//Devolvemos el nuevo state
        ...state,
        horario: array
      }
    }
    case HorarioActionTypes.CARGA_HORARIOS: {
      return {
        ...state,
        horario: action.payload.lista
      }
    }
    case HorarioActionTypes.INICIALIZA: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
