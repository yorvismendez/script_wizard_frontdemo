import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GloStatsucces } from '../interface/home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl: string = environment.baseUrl;

constructor(
  private http: HttpClient,
) { }


consGobals(nospinner: boolean): Observable<GloStatsucces[]>{
  const url = `${this.baseUrl}/api/globalstatus/consultall`;
  let headers = new HttpHeaders()

  if(nospinner){
    headers = headers.set('No-Loading', 'true');

  }
  
  

  return this.http.get<GloStatsucces[]>(url, { headers });
}





}
