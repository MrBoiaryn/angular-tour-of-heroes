import { Injectable } from '@angular/core';
import { UnitInterface } from '../models/unit.interface';
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

<<<<<<< HEAD
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
=======
  getHeroes(): Observable<UnitInterface[]> {
    return this.http.get<UnitInterface[]>(this.heroesUrl).pipe(
>>>>>>> dev
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
