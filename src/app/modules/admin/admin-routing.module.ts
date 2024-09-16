import { Component, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { EjecucionesComponent } from './pages/ejecuciones/ejecuciones.component';
import { FarmaciasComponent } from './pages/farmacias/farmacias.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard, AuthGuardAdmin } from 'src/app/core/guards/auth-guard.guard';

const routes: Routes = [
  
  {
    path: '',
    component: AdminLayoutComponent,    
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
        canActivate: ['authGuard'],
        data: {
          title: 'Inicio',
          name: 'Inicio',
        },
      },
      {
        path: 'ejecuciones',
        component: EjecucionesComponent,
        canActivate: ['authGuard'],
        data: {
          title: 'Ejecuciones',
          name: 'Ejecuciones',
        },
      },
      {
        path: 'farmacias',
        component: FarmaciasComponent,
        canActivate: ['AuthGuardAdmin'],
        data: {
          title: 'Farmacias',
          name: 'Farmacias',
        },
      },
      {
        path: 'scripts',
        canActivate: ['AuthGuardAdmin'],
        component: ScriptsComponent,
        data: {
          title: 'Scripts',
          name: 'Scripts',
        },
      },
      {
        path: 'usuarios',
        canActivate: ['AuthGuardAdmin'],
        component: UsersComponent,
        data: {
          title: 'Usuarios',
          name: 'Usuarios',
        },
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: 'authGuard',
      useFactory: (router: Router) => AuthGuard.canActivate(router),
      deps: [Router]
    },
    {
      provide: 'AuthGuardAdmin',
      useFactory: (router: Router) => AuthGuardAdmin.canActivate(router),
      deps: [Router]
    }
  ]
  
})
export class AdminRoutingModule {}
