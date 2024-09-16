import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Destino,
  DestinoResponse,
  DestinosSucces,
  Ejecucion,
  EjecucionResponse,
  FarmActivasSucces,
  IDScript,
  ScriptPagSucces,
} from '../interface/ejecuciones.interface';
import { ScriptSucces } from '../interface/scripts.interface';

@Injectable({
  providedIn: 'root',
})
export class EjecucionesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  consFarAct(): Observable<FarmActivasSucces[]> {
    const url = `${this.baseUrl}/api/farmacias/consact`;
    return this.http.get<FarmActivasSucces[]>(url);
  }

  scriptsPag(pagina: number): Observable<ScriptPagSucces> {
    const url = `${this.baseUrl}/api/ejecuciones/consultar?page=${pagina}&size=20&sort=fecha,desc`;
    return this.http.get<ScriptPagSucces>(url);
  }

  destinos(idejecucion: number, nospinner: boolean): Observable<DestinosSucces[]> {
    const url = `${this.baseUrl}/api/destino/consultarbyid?idEjecucion=${idejecucion}`;

    let headers = new HttpHeaders();


    if (nospinner) {
      headers = headers.set('No-Loading', 'true');
    }

    return this.http.get<DestinosSucces[]>(url, { headers });
  }

  insertEjecucion(ejecucion: Ejecucion): Observable<EjecucionResponse> {
    const url = `${this.baseUrl}/api/ejecuciones/insertareje`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<EjecucionResponse>(url, ejecucion, { headers });
  }

  insertarDestino(destino: Destino): Observable<DestinoResponse> {
    const url = `${this.baseUrl}/api/destino/insertardes`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<DestinoResponse>(url, destino, { headers });
  }

  consulScrNivel(): Observable<ScriptSucces[]> {
    const url = `${this.baseUrl}/api/scripts/consulniv?nivel=1`;

    return this.http.get<ScriptSucces[]>(url);
  }

  consScriAct(): Observable<ScriptSucces[]> {
    const url = `${this.baseUrl}/api/scripts/consulacti`;
    return this.http.get<ScriptSucces[]>(url);
  }
}
