import { PistaReservaModel } from '../../models/pistaReservaModel';
import { ReservaActions, ReservaActionTypes } from './reserva.actions';



export interface ReservaState {
  pistasDisponibles: PistaReservaModel[] | null;
  horasDisponibles: string[] | null;
  enReserva: PistaReservaModel | null;
}

//set the initial state with localStorage
export const initialState: ReservaState = {
  pistasDisponibles: null,
  horasDisponibles: null,
  enReserva:  null
};

export function reservaReducer(state = initialState, action: ReservaActions): ReservaState {
  switch (action.type) {
    case ReservaActionTypes.PISTAS_DISPONIBLES: {
      return {
        ...state,
        pistasDisponibles: action.payload.lista
      };
    }
    case ReservaActionTypes.HORAS_DISPONIBLES: {
      return {
        ...state,
        horasDisponibles: action.payload.lista
      };
    }
    case ReservaActionTypes.EN_RESERVA: {
      return {
        ...state,
        enReserva: action.payload.reserva
      };
    }
    default: {
      return state;
    }
  }
}
