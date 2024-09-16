import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScriptEdi, ScriptIn, ScriptSucces } from '../interface/scripts.interface';

@Injectable({
  providedIn: 'root',
})
export class ScriptsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  consScriAct(): Observable<ScriptSucces[]> {
    const url = `${this.baseUrl}/api/scripts/consulacti`;
    return this.http.get<ScriptSucces[]>(url);
  }


  saveScript(script: ScriptIn): Observable<ScriptSucces> {
    const url = `${this.baseUrl}/api/scripts/guardarscript`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<ScriptSucces>(url, script, { headers });
  }

  ediScript(script: ScriptEdi): Observable<ScriptSucces> {
    const url = `${this.baseUrl}/api/scripts/guardarscript`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<ScriptSucces>(url, script, { headers });
  }

  consulid(idscript: number): Observable<ScriptSucces> {
    const url = `${this.baseUrl}/api/scripts/conultid?idscript=${idscript}`;
    return this.http.get<ScriptSucces>(url);
  }
}
