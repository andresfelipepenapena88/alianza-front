import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, map } from 'rxjs';
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
    return this.http.get<ClientInfo[]>(`${ environment.URL_BASE }${ environment.CLIENTS_API_URL }/getAllClients`);
  }

  getClientsBySharedKey(sharedKey: string): Observable<ClientInfo[]> {
    return this.http.get<ClientInfo[]>(`${ environment.URL_BASE }${ environment.CLIENTS_API_URL }/getClientBySharedKey`, { params: new HttpParams().set('shared_key', sharedKey)});
  }

  addClient(client: ClientInfo): Observable<number> {
    const body = client;
    return this.http.post<number>(`${ environment.URL_BASE }${ environment.CLIENTS_API_URL }/addClient`, body);
  }

  getClientsByAdvancedSearch(client: ClientInfo): Observable<ClientInfo[]> {
    const body = client;
    return this.http.post<ClientInfo[]>(`${ environment.URL_BASE }${ environment.CLIENTS_API_URL }/getClientByAdvancedSearch`, body);
  }

}
