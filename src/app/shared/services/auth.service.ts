import { Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { GetAuthResponseInterface } from '../types/get-auth-response.interface';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl!: string;

  constructor(private messageService: MessageService) {}

  login(login: string, password: string): Observable<boolean> {
    return of({ login: 'admin', password: '12345678' })
      .pipe(delay(2000))
      .pipe(
        map((res: GetAuthResponseInterface) => {
          return login === res.login && password === res.password
            ? (this.isLoggedIn = true)
            : false;
        }),
        tap((x) => (x ? this.log(`login success`) : this.log(`login error`)))
      );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.log(`logout`);
  }

  private log(message: string) {
    this.messageService.add(`LoginService: ${message}`);
  }
}
