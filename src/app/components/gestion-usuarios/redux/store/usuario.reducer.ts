import { UserModel } from '../../models/userModel';
import { UserActions, UserActionTypes } from './usuario.actions';




export interface UserState{
  users: UserModel[] | null;
}
export const initialState: UserState = {
  users: null
};


export function userReducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.CREAR: {
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    }
    case UserActionTypes.ELIMINAR: {
      return {
        ...state,
        users: state.users.filter(
          user => user.ID_Usuario !== action.payload.id)
      };
    }
    case UserActionTypes.EDITAR: {
      //buscamos posición del user a modificar
      const index = state.users.findIndex(item => item.ID_Usuario === action.payload.ID_Usuario);
      const array = [...state.users]; //copiamos users a nuevo array
      array[index] = action.payload;
      return {//devolvemos nuevo state
        ...state,
        users: array
      }
    }
    case UserActionTypes.CARGA_USERS: {
      return {
        ...state,
        users: action.payload.lista
      }
    }
    case UserActionTypes.VER_USERS: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}
