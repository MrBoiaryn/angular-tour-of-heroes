import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';
import { UnitInterface } from '../../models/unit.interface';
import { HeroService } from '../../services/hero.service';
import { BanditService } from '../../services/bandit.service';

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

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.unitsSearch();
  }
  unitsSearch(): void {
    this.units$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      // switchMap((term: string) => this.heroService.searchHeroes(term))
      concatMap((term: string) =>
        forkJoin([
          this.heroService.searchHeroes(term),
          this.banditService.searchBandits(term),
        ])
      ),
      map(([heroes, bandits]) => [...heroes, ...bandits])
    );
  }
}
