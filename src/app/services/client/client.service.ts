import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Client {
  id: number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataDiNascita: string;
  azienda: string;
}

@Injectable({
  providedIn: 'root'
})

export class ClientService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) { }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getById(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}?userId=${id}`);
  }

  getClients(): Observable<Client[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateClient(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
  }
}
