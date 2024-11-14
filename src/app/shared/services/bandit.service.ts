import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UnitInterface } from '../types/unit.interface';

@Injectable({
  providedIn: 'root',
})
export class BanditService {
  private banditsUrl = 'api/bandits';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getBandits(): Observable<UnitInterface[]> {
    return this.http.get<UnitInterface[]>(this.banditsUrl).pipe(
      tap((_) => this.log('fetched bandits')),
      catchError(this.handleError<UnitInterface[]>('getBandits', []))
    );
  }

  getBandit(id: number): Observable<UnitInterface> {
    const url = `${this.banditsUrl}/${id}`;
    return this.http.get<UnitInterface>(url).pipe(
      tap((_) => this.log(`fetched bandit id=${id}`)),
      catchError(this.handleError<UnitInterface>(`getBandit id=${id}`))
    );
  }

  updateBandit(Bandit: UnitInterface): Observable<any> {
    return this.http.put(this.banditsUrl, Bandit, this.httpOptions).pipe(
      tap((_) => this.log(`updated bandit id=${Bandit.id}`)),
      catchError(this.handleError<any>('updateBandit'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addBandit(bandit: UnitInterface): Observable<UnitInterface> {
    return this.http
      .post<UnitInterface>(this.banditsUrl, bandit, this.httpOptions)
      .pipe(
        tap((newBandit: UnitInterface) =>
          this.log(`added bandit w/ id=${newBandit.id}`)
        ),
        catchError(this.handleError<UnitInterface>('addBandit'))
      );
  }

  deleteBandit(id: number): Observable<UnitInterface> {
    const url = `${this.banditsUrl}/${id}`;

    return this.http.delete<UnitInterface>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted bandit id=${id}`)),
      catchError(this.handleError<UnitInterface>('deleteBandit'))
    );
  }

  searchBandits(term: string): Observable<UnitInterface[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<UnitInterface[]>(`${this.banditsUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found bandits matching "${term}"`)
            : this.log(`no bandits matching "${term}"`)
        ),
        catchError(this.handleError<UnitInterface[]>('searchBandits', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`BanditService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
