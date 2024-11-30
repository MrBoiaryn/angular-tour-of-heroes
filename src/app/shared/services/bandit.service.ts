import { Injectable, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { UnitInterface } from '../types/unit.interface';
import { RequestUnitInterface } from '../types/request-unit.interface';
import { ResponseUnitInterfase } from '../types/response-unit.interfase';

const urlBandits =
  'https://tour-of-heroes-ad5af-default-rtdb.europe-west1.firebasedatabase.app/bandits';

@Injectable({
  providedIn: 'root',
})
export class BanditService implements OnInit {
  bandits: UnitInterface[] = [];
  idLog!: number;

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  addBandit(bandit: UnitInterface): Observable<UnitInterface> {
    return this.http.get<UnitInterface[]>(`${urlBandits}.json`).pipe(
      switchMap((bandits: UnitInterface[]) => {
        const values = Object.values(bandits);
        const maxId = Math.max(...values.map((bandit) => bandit.id));
        this.idLog = maxId + 1;

        return this.http.post<RequestUnitInterface>(`${urlBandits}.json`, {
          ...bandit,
          type: 'bandit',
          id: maxId + 1,
        });
      }),
      tap(() => {
        this.log(`added bandit w/ id=${this.idLog}`);
      }),
      catchError(this.handleError<UnitInterface>('addBandit'))
    );
  }

  updateBandit(bandit: UnitInterface): Observable<any> {
    const updatedBandit = { ...bandit, name: bandit.name };
    return this.http
      .put(`${urlBandits}/${bandit.key}.json`, updatedBandit)
      .pipe(
        tap(() => this.log(`updated bandit id=${bandit.id}`)),
        catchError(this.handleError<any>('updateBandit'))
      );
  }

  getBandits(): Observable<UnitInterface[]> {
    return this.http.get<ResponseUnitInterfase>(`${urlBandits}.json`).pipe(
      map((res) => {
        const arr: UnitInterface[] = [];
        Object.keys(res).forEach((key) => {
          arr.push({ key, ...res[key] });
        });
        return arr;
      }),
      tap((_) => this.log('fetched bandits')),
      catchError(this.handleError<UnitInterface[]>('getBandits', []))
    );
  }

  getBandit(id: number): Observable<UnitInterface> {
    return this.getBandits().pipe(
      map((bandits) => bandits.find((bandit) => bandit.id === id)),
      tap((bandit) => {
        if (!bandit) {
          console.warn(`Bandit with id ${id} not found`);
        }
      }),
      switchMap((bandit) => {
        if (bandit) {
          return of(bandit);
        } else {
          return throwError(() => new Error(`Bandit with id ${id} not found`));
        }
      })
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  deleteBandit(bandit: UnitInterface): Observable<any> {
    const banditId = bandit.id;

    const url = `${urlBandits}/${bandit.key}.json`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(() => this.log(`Deleted bandit with id=${banditId}`)),
      catchError(this.handleError<any>('deleteBandit'))
    );
  }

  searchBandits(term: string): Observable<UnitInterface[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<ResponseUnitInterfase>(`${urlBandits}.json`).pipe(
      map((res) => {
        const arr: UnitInterface[] = [];
        Object.keys(res).forEach((key) => {
          arr.push({ key, ...res[key] });
        });
        return arr;
      }),
      map((bandits) =>
        bandits.filter((bandit) =>
          bandit.name.toLowerCase().includes(term.toLowerCase())
        )
      ),
      tap((results) => {
        if (results.length > 0) {
          this.log(`Found ${results.length} bandit matching "${term}"`);
        } else {
          this.log(`No bandits matching "${term}"`);
        }
      }),
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
