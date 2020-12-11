import { PistaReservaModel } from '../../models/pistaReservaModel';
import { ReservaActions, ReservaActionTypes } from './reserva.actions';



export interface ReservaState {
  pistasDisponibles: PistaReservaModel[] | null;
}

//set the initial state with localStorage
export const initialState: ReservaState = {
  pistasDisponibles: null
};

export function reservaReducer(state = initialState, action: ReservaActions): ReservaState {
  switch (action.type) {
    case ReservaActionTypes.PISTAS_DISPONIBLES: {
      return {
        ...state,
        pistasDisponibles: action.payload.lista
      };
    }
    default: {
      return state;
    }
  }
}
