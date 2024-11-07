import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroInterface } from '../../models/hero.interface';
import { HeroService } from '../../services/hero.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bandits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bandits.component.html',
  styleUrl: './bandits.component.scss',
})
export class BanditsComponent {
  bandits: HeroInterface[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.bandits = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as HeroInterface).subscribe((hero) => {
      this.bandits.push(hero);
    });
  }

  delete(hero: HeroInterface): void {
    this.bandits = this.bandits.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
