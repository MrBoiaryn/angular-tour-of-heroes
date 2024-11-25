import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UnitInterface } from '../../shared/types/unit.interface';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../shared/services/hero.service';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  heroes: UnitInterface[] = [];

  constructor(public heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroitos();
  }

  getHeroitos(): void {
    this.heroService.getHeroitos().subscribe((heroes: UnitInterface[]) => {
      this.heroes = heroes;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as UnitInterface).subscribe((hero) => {
      // this.heroes.push(hero);
      if (hero) {
        this.getHeroitos();
      }
    });
  }

  delete(hero: UnitInterface): void {
    if (!hero || !hero.key) {
      console.error('Неправильний формат даних бандита');
      return;
    }

    this.heroes = this.heroes.filter((h) => h.key !== hero.key);
    this.heroService.deleteHero(hero).subscribe(
      () => console.log('Бандит успішно видалений'),
      (error) => console.error('Помилка при видаленні бандита:', error)
    );
  }
}
