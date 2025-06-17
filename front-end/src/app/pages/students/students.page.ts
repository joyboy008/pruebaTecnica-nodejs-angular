import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  standalone: false,
})
export class StudentsPage {
  gradeId = '1';
  students: any[] = [];

  grades = [
    { id: '1', name: '1er Grado' },
    { id: '2', name: '2do Grado' },
    { id: '3', name: '3er Grado' },
    { id: '4', name: '4to Grado' },
    { id: '5', name: '5to Grado' },
    { id: '6', name: '6to Grado' },
  ];

  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}

  buscarEstudiantes() {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token no disponible. El usuario no está autenticado.');
      return;
    }

    this.studentService.getStudentsByGrade(this.gradeId, token).subscribe({
      next: (res) => {
        this.students = res;
      },
      error: (err) => {
        console.error('Error al obtener alumnos:', err);
      },
    });
  }
}
