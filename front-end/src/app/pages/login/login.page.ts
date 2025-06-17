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

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/students']);
      },
      error: () => {
        this.mensaje = 'Usuario o contraseña incorrectos ❌';
      },
    });
  }
}
