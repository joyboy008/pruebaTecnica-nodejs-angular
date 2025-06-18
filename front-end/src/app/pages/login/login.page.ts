import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: false,
})
export class LoginPage {
  username = '';
  password = '';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) {}

  get passwordValida(): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(this.password);
  }

  login() {
    if (!this.isPasswordStrong(this.password)) {
      this.mensaje =
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.username = '';
        this.password = '';
        this.router.navigate(['/students']);
      },
      error: () => {
        this.mensaje = 'Usuario o contraseña incorrectos ❌';
      },
    });
  }

  isPasswordStrong(password: string): boolean {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_])[A-Za-z\d@$!%*?&.#_]{8,}$/;
    return regex.test(password);
  }
}
