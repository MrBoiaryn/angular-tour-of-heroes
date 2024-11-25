import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UnitInterface } from '../../shared/types/unit.interface';
import { RouterLink } from '@angular/router';
import { BanditService } from '../../shared/services/bandit.service';

@Component({
  selector: 'app-bandits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bandits.component.html',
  styleUrl: './bandits.component.scss',
})
export class BanditsComponent implements OnInit {
  bandits: UnitInterface[] = [];

  constructor(public banditService: BanditService) {}

  ngOnInit(): void {
    this.getBanditos();
  }

  getBanditos(): void {
    this.banditService.getBanditos().subscribe((bandits: UnitInterface[]) => {
      this.bandits = bandits;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.banditService
      .addBandit({ name } as UnitInterface)
      .subscribe((bandit) => {
        // this.bandits.push(bandit);
        if (bandit) {
          this.getBanditos();
        }
      });
  }

  delete(bandit: UnitInterface): void {
    if (!bandit || !bandit.key) {
      console.error('Неправильний формат даних бандита');
      return;
    }

    this.bandits = this.bandits.filter((h) => h.key !== bandit.key);
    this.banditService.deleteBandit(bandit).subscribe(
      () => console.log('Бандит успішно видалений'),
      (error) => console.error('Помилка при видаленні бандита:', error)
    );
  }
}
