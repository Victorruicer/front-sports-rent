export class UserModel {

    ID_Usuario?: number;
    Usuario?: string;
    Apellidos?: string;
    Id_Perfil?: number;
    Perfil?: string;
    Email?: string;
    Password?: string;

   constructor(id?: number, user?: string, apellidos?: string, perfil?: number, email?: string, pass?: string){
    this.ID_Usuario = id;
    this.Usuario = user;
    this.Apellidos = apellidos;
    this.Id_Perfil = perfil;
    this.Email = email;
    this.Password = pass;
  }


}
