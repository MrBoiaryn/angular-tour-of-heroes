import { Injectable } from '@angular/core';
import { UnitInterface } from '../models/unit.interface';
import { HEROES } from '../mock/mock-heroes';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getHeroes(): Observable<UnitInterface[]> {
    return this.http.get<UnitInterface[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<UnitInterface[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<UnitInterface> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<UnitInterface>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<UnitInterface>(`getHero id=${id}`))
    );
  }

  updateHero(hero: UnitInterface): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addHero(hero: UnitInterface): Observable<UnitInterface> {
    return this.http
      .post<UnitInterface>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: UnitInterface) =>
          this.log(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<UnitInterface>('addHero'))
      );
  }

  deleteHero(id: number): Observable<UnitInterface> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<UnitInterface>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<UnitInterface>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<UnitInterface[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<UnitInterface[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<UnitInterface[]>('searchHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
