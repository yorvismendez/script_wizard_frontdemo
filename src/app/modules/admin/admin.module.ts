import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { EjecucionesComponent } from './pages/ejecuciones/ejecuciones.component';
import { FarmaciasComponent } from './pages/farmacias/farmacias.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { UsersComponent } from './pages/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    HomeComponent,
    EjecucionesComponent,
    FarmaciasComponent,
    ScriptsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class AdminModule { }
