import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: false,
})
export class RegisterPage {
  username = '';
  password = '';
  mensaje = '';

  constructor(private authService: AuthService) {}

  registrar() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado exitosamente ✅';
      },
      error: (err: any) => {
        console.error(err);
        this.mensaje = 'Error al registrar el usuario ❌';
      },
    });
  }
}
