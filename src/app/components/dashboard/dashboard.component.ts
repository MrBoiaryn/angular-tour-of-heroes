import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UnitInterface } from '../../models/unit.interface';
import { HeroService } from '../../services/hero.service';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { BanditService } from '../../services/bandit.service';
import { UnitTypeService } from '../../services/unitType.service';
import {
  RouterLinkActiveDelay,
  RouterLinkDelayModule,
} from '@bcodes/ngx-routerlink-delay';

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
  activeTub: 'heroes' | 'bandits' = 'heroes';

  constructor(
    private heroService: HeroService,
    private banditService: BanditService,
    private unitTypeService: UnitTypeService
  ) {}

  switchTab(tab: 'heroes' | 'bandits'): void {
    this.activeTub = tab;
    if (tab === 'bandits') this.unitTypeService.setUnitType('bandit');
    if (tab === 'heroes') this.unitTypeService.setUnitType('hero');
  }

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
