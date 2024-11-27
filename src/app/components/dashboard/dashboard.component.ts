import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UnitInterface } from '../../shared/types/unit.interface';
import { HeroService } from '../../shared/services/hero.service';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { BanditService } from '../../shared/services/bandit.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, HeroSearchComponent, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  heroes: UnitInterface[] = [];
  bandits: UnitInterface[] = [];

  constructor(
    private heroService: HeroService,
    private banditService: BanditService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.getBandits();
  }

  getHeroes(): void {
    this.heroService
      .getHeroitos()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
  getBandits(): void {
    this.banditService
      .getBanditos()
      .subscribe((bandits) => (this.bandits = bandits.slice(1, 5)));
  }
}
