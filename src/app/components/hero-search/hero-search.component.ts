import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { UnitInterface } from '../../shared/types/unit.interface';
import { HeroService } from '../../shared/services/hero.service';
import { BanditService } from '../../shared/services/bandit.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-hero-search',
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent implements OnInit {
  units$!: Observable<UnitInterface[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private banditService: BanditService
  ) {}

  ngOnInit(): void {
    this.unitSearch();
  }

  unitSearch(): void {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) =>
          forkJoin([
            this.heroService.searchHeroes(term),
            this.banditService.searchBandits(term),
          ])
        ),
        catchError(() => of([])),
        map(([heroes, bandits]) => {
          const units = [...heroes, ...bandits];
          return units.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
        })
      )
      .subscribe((units) => {
        this.units$ = of(units);
      });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
