// import { Injectable } from '@angular/core';
// import { CanLoad, Route, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthServiceCanloadGuard implements CanLoad {

//   constructor(private router: Router){}

//   canLoad(route: Route ){
//       var user = JSON.parse(localStorage.getItem('currentUser'));
//       if (user && user.Token != null) {
//         console.log("Comprobando Admin...");
//           let url: string = route.path;
//           console.log('Url: '+ url + ' perfil = ' + user.IdPerfil);

//           switch(url){
//             case "gestionUsuario":
//             case "listadoPedidos":
//               if(user.IdPerfil != 1){
//                 console.log("no tiene permiso");
//                 this.router.navigate(['home']);
//                 return false;
//               }
//               break;
//             case "gestionArticulo":
//               if(user.IdPerfil >2){
//                 console.log("no tiene permiso");
//                 this.router.navigate(['home']);
//                 return false;
//               }
//               break;
//             default:
//               return true;
//           }
//         return true;
//       }
//     // Si no se logeado se redirecciona
//     console.log("no hay usuario logado canLoad");
//     this.router.navigate(['/login']);
//     return false;
//   }

// }
