import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  message!: string;
  userLogin!: string;
  userPassword!: string;

  constructor(public authService: AuthService, private router: Router) {}

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  login(): void {
    this.message = 'Trying to log in ...';
    this.authService.login(this.userLogin, this.userPassword).subscribe({
      next: (res) => {
        this.setMessage();
        if (!this.authService.isLoggedIn) return;

        const redirect = this.authService.redirectUrl
          ? this.authService.redirectUrl
          : '/dashboard';

        this.router.navigate([redirect]);
      },
      error: (err) => console.log(err),
    });
  }

  logout(): void {
    this.authService.logout();
  }

  private setMessage(msg: string = ''): void {
    if (msg) {
      this.message = msg;
      return;
    }
    this.message = `${this.authService.isLoggedIn ? 'Success' : 'Error'}`;
  }
}
