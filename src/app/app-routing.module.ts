import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { AdminModule } from './modules/admin/admin.module';
import { AdminLayoutComponent } from './modules/admin/layout/admin-layout/admin-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo:'auth', 
    pathMatch: 'full'
  },
  {
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '404', 
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo:'404'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
