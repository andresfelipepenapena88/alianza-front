import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, of, map } from 'rxjs';
import { ClientInfo } from '../models/client.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllClients(): Observable<ClientInfo[]> {
    return this.http.get<ClientInfo[]>(`${ environment.URL_BASE }${ environment.CLIENTS_API_URL }/getAllClients`/*, { params: new HttpParams().set('shared_key', 'apena')}*/);
  }

}
