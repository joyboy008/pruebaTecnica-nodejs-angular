import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnDestroy {
  isLoggedIn = false;
  private sub?: Subscription;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.sub = this.authService.loggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  irAEstudiantes() {
    this.navCtrl.navigateForward('/students', { animated: false });
  }

  irACrearEstudiante() {
    this.navCtrl.navigateForward('/crear-estudiante', { animated: false });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
