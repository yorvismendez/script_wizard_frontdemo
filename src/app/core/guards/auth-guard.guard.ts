import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import {
  Role,
  Tokendecod,
} from 'src/app/modules/admin/interface/ejecuciones.interface';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {
  static canActivate(router: Router): CanActivateFn {
    return (route, state) => {
      const token = localStorage.getItem('token');
      if (token) {
        return true; 
      } else {
        localStorage.removeItem('token');
        router.navigate(['/auth/login']); 
        return false; 
      }
    };
  }
}


export class AuthGuardAdmin {
  static tokendec?: Tokendecod;

  static canActivate(router: Router): CanActivateFn {
    return (route, state) => {
      const token = localStorage.getItem('token') ?? '';

      if (token) {
        AuthGuardAdmin.tokendec = jwtDecode(token);

        if (AuthGuardAdmin.tokendec) {
          const rolesarray: Role[] = JSON.parse(AuthGuardAdmin.tokendec.authorities);

          const esadmin = rolesarray.some((role: Role) => role.authority === 'ROLE_ADMIN');

          if (esadmin) {
            return true; 
          } else {
            router.navigate(['/admin/inicio']);  
            return false; 
          }
        } else {
          router.navigate(['/admin/inicio']); 
          return false;
        }
      } else {
        localStorage.removeItem('token');
        router.navigate(['/auth/login']); 
        return false;
      }
    };
  }
}
