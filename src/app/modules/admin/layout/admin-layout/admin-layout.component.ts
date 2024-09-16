import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role, Tokendecod } from '../../interface/ejecuciones.interface';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  token!: Tokendecod;
  admin: boolean = false;
  username: string = '';



  constructor(private router: Router){}



  ngOnInit(): void {

    const tokenencoded = localStorage.getItem('token')!;
    this.token = jwtDecode(tokenencoded);
    const rolesarray: Role[] = JSON.parse(this.token.authorities);
    const esadmin = rolesarray.some((role: Role) => role.authority === 'ROLE_ADMIN');

    this.username = this.token.sub;

    if(esadmin){
      this.admin= true;

    }
    else{
      this.admin= false;
    }


  }


  logAuth(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
    }



}



