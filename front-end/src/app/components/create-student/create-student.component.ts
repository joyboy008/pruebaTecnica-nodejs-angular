import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  standalone: false,
})
export class CreateStudentComponent {
  student = {
    student_name: '',
    birth_date: '',
    father_name: '',
    mother_name: '',
    grade_id: '',
    section: '',
    admission_date: '',
  };

  grades = [
    { id: '1', name: '1ro Primaria' },
    { id: '2', name: '2do Primaria' },
    { id: '3', name: '3ro Primaria' },
    { id: '4', name: '4to Primaria' },
    { id: '5', name: '5to Primaria' },
    { id: '6', name: '6to Primaria' },
  ];
  message = '';

  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  crearEstudiante() {
    const token = this.authService.getToken();
    if (!token) {
      this.message = 'Debe iniciar sesión';
      return;
    }

    this.studentService.createStudent(this.student, token).subscribe({
      next: () => {
        this.message = 'Estudiante creado correctamente';
        this.student = {
          student_name: '',
          birth_date: '',
          father_name: '',
          mother_name: '',
          grade_id: '',
          section: '',
          admission_date: '',
        };
      },
      error: (err) => {
        console.error(err);
        this.message = 'Error al crear estudiante';
      },
    });
  }
}
