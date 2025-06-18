import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: false,
})
export class RegisterPage {
  username = '';
  password = '';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) {}

  get passwordValida(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(this.password);
  }

  registrar() {
    if (!this.passwordValida) {
      this.mensaje = 'La contraseña no cumple con los requisitos de seguridad.';
      return;
    }

    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente ✅';
        this.username = '';
        this.password = '';
        this.router.navigate(['/login']);
      },
      error: () => {
        this.mensaje = 'El usuario ya existe o ocurrió un error ❌';
      },
    });
  }
}
