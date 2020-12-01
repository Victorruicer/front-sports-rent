export class UserModel {

  ID_Usuario?: number;
  Nombre?: string;
  Apellido1?: string;
  Apellido2?: string;
  Dni?: string;
  Email?: string;
  Password?: string;
  Id_Perfil?: number;
  Imagen?: string;

  constructor(id?: number,
      nombre?: string,
      apellido1?: string,
      apellido2?: string,
      dni?: string,
      email?: string,
      pass?: string,
      id_perfil?: number,
      imagen?: string)
    {
    this.ID_Usuario = id;
    this.Nombre = nombre;
    this.Apellido1 = apellido1;
    this.Apellido2 = apellido2;
    this.Dni = dni;
    this.Email = email;
    this.Password = pass;
    this.Id_Perfil = id_perfil;
    this.Imagen = imagen;
  }
}
