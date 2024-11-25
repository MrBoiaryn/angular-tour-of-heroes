import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { UnitInterface } from '../../shared/types/unit.interface';
import { HeroService } from '../../shared/services/hero.service';
import { BanditService } from '../../shared/services/bandit.service';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
        catchError(() => of([]))
      )
      .subscribe(([heroes, bandits]) => {
        this.units$ = of([...heroes, ...bandits]);
      });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
