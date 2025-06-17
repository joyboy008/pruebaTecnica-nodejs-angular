import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:4000/auth';
  private tokenKey = 'auth_token';

  // Observable de sesión
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      username,
      password,
    });
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.loggedInSubject.next(true); // 🔁 Actualiza el estado de sesión
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedInSubject.next(false); // 🔁 Cierra sesión
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
