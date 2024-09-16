import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, ResponseError, ResponseSuccess, User } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }


  login(login: Login): Observable<ResponseSuccess>{
    const url = `${ this.baseUrl }/api/adm/login`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json')

    return this.http.post<ResponseSuccess>(url, login, {headers});
  }

  getUser(username: string): Observable<User>{
    const url = `${ this.baseUrl }/api/users/consname?username=${username}`;

    return this.http.get<User>(url);
  }
  
}
  