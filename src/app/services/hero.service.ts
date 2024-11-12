import { Injectable } from '@angular/core';
import { HeroInterface } from '../models/hero.interface';
import { HEROES } from '../mock/mock-heroes';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseHeroInterface } from '../models/response-hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes: HeroInterface[] = [];

  private heroesUrl = 'api/heroes';
  private heroesUrlRead =
    'https://tour-of-heroes-ad5af-default-rtdb.europe-west1.firebasedatabase.app/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  readHeroes(): void {
    this.http
      .get<ResponseHeroInterface>(`${this.heroesUrlRead}.json`)
      .pipe(
        map((res: ResponseHeroInterface) => {
          const arr: HeroInterface[] = Object.keys(res).map((key) => ({
            key,
            ...res[key],
          }));
          return arr;
        }),
        catchError((error) => {
          console.error('Помилка при завантаженні героїв:', error);
          return of([]);
        })
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
        console.log(heroes);
      });
  }
  // readHeroes(): void {
  //   this.http
  //     .get<ResponseHeroInterface>(`${this.heroesUrlRead}.json`)
  //     .pipe(
  //       map((res) => {
  //         const arr: HeroInterface[] = [];
  //         Object.keys(res).forEach((key) => arr.push({ key, ...res[key] }));
  //         return arr;
  //       })
  //     )
  //     .subscribe((heroes) => {
  //       this.heroes = heroes;
  //       console.log(heroes);
  //     });
  // }

  getHeroes(): Observable<HeroInterface[]> {
    return this.http.get<HeroInterface[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<HeroInterface[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<HeroInterface>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HeroInterface>(`getHero id=${id}`))
    );
  }

  updateHero(hero: HeroInterface): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addHero(hero: HeroInterface): Observable<HeroInterface> {
    return this.http
      .post<HeroInterface>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: HeroInterface) =>
          this.log(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<HeroInterface>('addHero'))
      );
  }

  deleteHero(id: number): Observable<HeroInterface> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<HeroInterface>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<HeroInterface>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<HeroInterface[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<HeroInterface[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<HeroInterface[]>('searchHeroes', []))
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
