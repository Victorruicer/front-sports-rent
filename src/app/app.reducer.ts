// import { loadingReducer, LoadingState } from "./shared/componentes/loading/store/loading.reducer";
import { Action, ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from "@ngrx/store";
import { userReducer, UserState } from './components/gestion-usuarios/redux/store/usuario.reducer';
import { localStorageSync, LocalStorageConfig } from 'ngrx-store-localstorage';
import { loginReducer, LoginState } from './components/ident/redux/store/login.reducer';
import { registroReducer, RegistroState } from './components/ident/redux/store/registro.reducer';
import { PerfilState, perfilReducer } from './components/perfil/redux/store/perfil.reducer';
import { tarifaReducer, TarifaState } from './components/gestion-tarifas/redux/store/tarifa.reducer';
import { instalacionReducer, InstalacionState } from './components/gestion-instalaciones/redux/store/instalacion.reducer';
import { actividadReducer, ActividadState } from "./components/gestion-actividades/redux/store/actividad.reducer";
import { ReservaState, reservaReducer } from './components/reservas/redux/store/reserva.reducer';
import { horarioReducer, HorarioState } from "./components/gestion-horarios/redux/store/horario.reducer";



export interface AppState {

  //loading: LoadingState;
  login: LoginState,
  users: UserState,
  registro: RegistroState,
  perfil: PerfilState,
  tarifa: TarifaState,
  instalacion: InstalacionState,
  actividad: ActividadState,
  reserva: ReservaState,
  horario: HorarioState
}

export const appReducers: ActionReducerMap<any> = {
  //loading: loadingReducer,
  login: loginReducer,
  users: userReducer,
  registro: registroReducer,
  perfil: perfilReducer,
  tarifa: tarifaReducer,
  instalacion: instalacionReducer,
  actividad: actividadReducer,
  reserva: reservaReducer,
  horario: horarioReducer
};

export const selectLoginState = createFeatureSelector<AppState>('login');

export function persitsData(reducer: ActionReducer<any>): ActionReducer<any> {
  const config: LocalStorageConfig = {
    keys: [
//      {'loading': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'login': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'users': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'registro': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'perfil': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'tarifa': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'instalacion': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'actividad': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'reserva': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
      {'horario': { encrypt: (message:string) => {return message;}, decrypt: (message:string) => {return message;}}},
    ],
    rehydrate: true,
    removeOnUndefined: true,
    storage: sessionStorage
  };
  return localStorageSync(config)(reducer);
}


export const metaReducers: MetaReducer<any, Action>[] = [persitsData];

export const arrEffect: any[] = [];
