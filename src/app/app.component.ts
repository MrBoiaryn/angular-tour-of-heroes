import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MessagesComponent } from './components/messages/messages.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { LoginComponent } from './components/login/login.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MessagesComponent,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  links = ['Dashboard', 'Heroes', 'Bandits'];
  activeLink = this.links[0];

  title = 'Tour of heroes';

  constructor(public dialog: MatDialog, public authService: AuthService) {}

  openLogin(): void {
    this.dialog.open(LoginComponent).afterClosed();
  }

  logout(): void {
    this.authService.logout();
  }
}
