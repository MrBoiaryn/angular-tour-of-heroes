import { Injectable } from '@angular/core';
import { UnitInterface } from '../types/unit.interface';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestUnitInterface } from '../types/request-unit.interface';
import { ResponseUnitInterfase } from '../types/response-unit.interfase';

const urlHeroes =
  'https://tour-of-heroes-ad5af-default-rtdb.europe-west1.firebasedatabase.app/heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes: UnitInterface[] = [];
  idLog!: number;

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  addHero(hero: UnitInterface): Observable<any> {
    return this.http.get<UnitInterface[]>(`${urlHeroes}.json`).pipe(
      switchMap((heroes: UnitInterface[]) => {
        const values = Object.values(heroes);
        const maxId = Math.max(...values.map((hero) => hero.id));
        this.idLog = maxId + 1;

        return this.http.post<RequestUnitInterface>(`${urlHeroes}.json`, {
          ...hero,
          type: 'hero',
          id: maxId + 1,
        });
      }),
      tap(() => {
        this.log(`added hero id=${this.idLog}`);
      }),
      catchError(this.handleError<UnitInterface>('addHero'))
    );
  }

  updateHero(hero: UnitInterface): Observable<any> {
    const updatedHero = { ...hero, name: hero.name };
    return this.http.put(`${urlHeroes}/${hero.key}.json`, updatedHero).pipe(
      tap(() => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  getHeroes(): Observable<UnitInterface[]> {
    return this.http.get<ResponseUnitInterfase>(`${urlHeroes}.json`).pipe(
      map((res) => {
        const arr: UnitInterface[] = [];
        Object.keys(res).forEach((key) => {
          arr.push({ key, ...res[key] });
        });
        return arr;
      }),
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<UnitInterface[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<UnitInterface> {
    return this.getHeroes().pipe(
      map((heroes) => heroes.find((hero) => hero.id === id)),
      tap((hero) => {
        if (!hero) {
          console.warn(`Hero with id ${id} not found`);
        }
      }),
      switchMap((hero) => {
        if (hero) {
          return of(hero);
        } else {
          return throwError(() => new Error(`Hero with id ${id} not found`));
        }
      })
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  deleteHero(hero: UnitInterface): Observable<any> {
    const heroId = hero.id;

    const url = `${urlHeroes}/${hero.key}.json`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(() => this.log(`Deleted hero with id=${heroId}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<UnitInterface[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<ResponseUnitInterfase>(`${urlHeroes}.json`).pipe(
      map((res) => {
        const arr: UnitInterface[] = [];
        Object.keys(res).forEach((key) => {
          arr.push({ key, ...res[key] });
        });
        return arr;
      }),
      map((heroes) =>
        heroes.filter((hero) =>
          hero.name.toLowerCase().includes(term.toLowerCase())
        )
      ),
      tap((results) => {
        if (results.length > 0) {
          this.log(`Found ${results.length} heroes matching "${term}"`);
        } else {
          this.log(`No heroes matching "${term}"`);
        }
      }),
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
