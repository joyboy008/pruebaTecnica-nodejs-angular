import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id: string;
  student_name: string;
  birth_date: string;
  father_name: string;
  mother_name: string;
  grade_id: number;
  section: string;
  admission_date: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    });
  }

  createStudent(student: Student, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-alumno`, student, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getStudentsByGrade(grade_id: number, token: string): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.apiUrl}/consultar-alumno/${grade_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
