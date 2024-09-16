import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConFarmSucces, FarmDelete, FarmEdit, FarmInsert, Status } from '../interface/farmacias.interface';

@Injectable({
  providedIn: 'root',
})
export class FarmaciasService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}


  conFarAct(): Observable<ConFarmSucces[]> {
    const url = `${this.baseUrl}/api/farmacias/consact`;
    return this.http.get<ConFarmSucces[]>(url);
  }


  conFarCod(codigo: number): Observable<ConFarmSucces> {
    const url = `${this.baseUrl}/api/farmacias/constcod?codigo=${codigo}`;
    return this.http.get<ConFarmSucces>(url);
  }

  conFarId(idfarmacia: number): Observable<ConFarmSucces> {
    const url = `${this.baseUrl}/api/farmacias/consulid?idfarmacia=${idfarmacia}`;
    return this.http.get<ConFarmSucces>(url);
  }


  conStatus(codigo: number): Observable<Status> {
    const url = `${this.baseUrl}/api/globalstatus/consultar?codigo=${codigo}`;
    return this.http.get<Status>(url);
  }



  inserFarm(farmacia: FarmInsert): Observable<ConFarmSucces> {
    const url = `${this.baseUrl}/api/farmacias/guardarfarm`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<ConFarmSucces>(url, farmacia, {headers});
  }


  editFarm(farmacia: FarmEdit): Observable<ConFarmSucces> {
    const url = `${this.baseUrl}/api/farmacias/guardarfarm`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<ConFarmSucces>(url, farmacia, {headers});
  }


  deletFarm(farmacia: FarmDelete): Observable<ConFarmSucces> {
    const url = `${this.baseUrl}/api/farmacias/deletfarm`;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<ConFarmSucces>(url, farmacia, {headers});
  }


  
}
