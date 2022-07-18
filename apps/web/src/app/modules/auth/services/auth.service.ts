import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public auth(dados: {
    email: string;
    password: string;
  }): Observable<{ _id: string; token: string }> {
    return this.httpClient.post<{ _id: string; token: string }>(
      'http://localhost:3333/api/auth',
      dados
    );
  }
}
