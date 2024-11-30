import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn) return true;
    this.authService.redirectUrl = state.url;

    const dialogRef = this.dialog.open(LoginComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate([this.authService.redirectUrl]);
      }
    });

    return false;
  }
}
