import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConUseActSucces, UserEdit, UserInsert } from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
    ) {}


  
    consUsAct(): Observable<ConUseActSucces[]>{
      const url = `${this.baseUrl}/api/users/consultar`;
      return this.http.get<ConUseActSucces[]>(url);
    }

    consulUser(username: string): Observable <ConUseActSucces>{
      const url = `${this.baseUrl}/api/users/consname?username=${username}`;

      return this.http.get<ConUseActSucces>(url);
    }

    insertUser(user: UserInsert): Observable<ConUseActSucces> {
      const url = `${this.baseUrl}/api/users/guardar`;
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.post<ConUseActSucces>(url, user, {headers});
    }


    editUser(user: UserEdit): Observable<ConUseActSucces> {
      const url = `${this.baseUrl}/api/users/guardar`;
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      return this.http.post<ConUseActSucces>(url, user, {headers});
    }



}
