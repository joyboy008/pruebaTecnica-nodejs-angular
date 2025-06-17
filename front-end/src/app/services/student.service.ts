import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  createStudent(data: any, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-alumno`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getStudentsByGrade(gradeId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/consultar-alumno/${gradeId}`, {
      headers,
    });
  }
}
