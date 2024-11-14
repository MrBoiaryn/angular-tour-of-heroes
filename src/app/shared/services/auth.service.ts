import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { GetAuthResponseInterface } from '../types/get-auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl!: string;

  constructor() {}

  login(login: string, password: string): Observable<boolean> {
    return of({ login: 'admin', password: '12345678' })
      .pipe(delay(2000))
      .pipe(
        map((res: GetAuthResponseInterface) => {
          return login === res.login && password === res.password
            ? (this.isLoggedIn = true)
            : false;
        })
      );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
