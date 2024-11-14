import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UnitInterface } from '../../shared/types/unit.interface';
import { HeroService } from '../../shared/services/hero.service';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { BanditService } from '../../shared/services/bandit.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroSearchComponent],
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
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
  getBandits(): void {
    this.banditService
      .getBandits()
      .subscribe((bandits) => (this.bandits = bandits.slice(1, 5)));
  }
}
