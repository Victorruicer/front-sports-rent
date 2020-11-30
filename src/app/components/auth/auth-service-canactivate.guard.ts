// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


// @Injectable()
// export class AuthServiceCanActivateGuard implements CanActivate{

//     constructor(private router:Router){}

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//         var user = JSON.parse(localStorage.getItem('currentUser'));
//         if(user && user.Token != null){
//             if(route.data.perfiles && route.data.perfiles.indexOf(user.IdPerfil) === -1){
//                 this.router.navigate(['home']);
//                 //Si no esta autorizado devuelve false
//                 return false;
//             }

//             //Si esta autorizado devuelve true
//             return true;
//         }
//         this.router.navigate(['/login'], {queryParams: {returnUrl: state.url} });
//         return false;
//     }
// }
