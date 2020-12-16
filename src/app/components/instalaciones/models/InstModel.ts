import { ActividadModel } from "../../gestion-actividades/models/actividadModel";

export class InstModel {
    Direccion: string;
    Horario?: string;
    Imagen?: string;
    Id_instalacion?: number;
    Id_horario?: number;
    Mensaje?: string;
    Instalacion: string;
    Nombre?: string;
    Operativa?: boolean;
    Actividades?: ActividadModel[]
}
