import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UnitInterface } from '../../models/unit.interface';
import { RouterLink } from '@angular/router';
import { BanditService } from '../../services/bandit.service';

@Component({
  selector: 'app-bandits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bandits.component.html',
  styleUrl: './bandits.component.scss',
})
export class BanditsComponent {
  bandits: UnitInterface[] = [];

  constructor(private banditService: BanditService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.banditService
      .getBandits()
      .subscribe((bandits) => (this.bandits = bandits));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.banditService
      .addBandit({ name } as UnitInterface)
      .subscribe((bandit) => {
        this.bandits.push(bandit);
      });
  }

  delete(bandit: UnitInterface): void {
    this.bandits = this.bandits.filter((h) => h !== bandit);
    this.banditService.deleteBandit(bandit.id).subscribe();
  }
}
