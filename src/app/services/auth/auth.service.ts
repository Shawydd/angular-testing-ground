import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  authenticate(username: string, password: string): Observable<any> {
    return this.getUsers().pipe(
      map((users: any[]) => users.find(user => user.username === username &&
        user.password === password)
      )
    )
  }
}
