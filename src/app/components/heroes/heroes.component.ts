import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UnitInterface } from '../../shared/types/unit.interface';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../../shared/services/hero.service';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-heroes',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  heroes: UnitInterface[] = [];

  constructor(public heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes: UnitInterface[]) => {
      this.heroes = heroes;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as UnitInterface).subscribe((hero) => {
      if (hero) {
        this.getHeroes();
      }
    });
  }

  delete(hero: UnitInterface): void {
    if (!hero || !hero.key) {
      return;
    }

    this.heroes = this.heroes.filter((h) => h.key !== hero.key);
    this.heroService.deleteHero(hero).subscribe();
  }
}
