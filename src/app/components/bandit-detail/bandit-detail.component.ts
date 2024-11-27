import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UnitInterface } from '../../shared/types/unit.interface';
import { ActivatedRoute } from '@angular/router';
import { BanditService } from '../../shared/services/bandit.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bandit-detail',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './bandit-detail.component.html',
  styleUrl: './bandit-detail.component.scss',
})
export class BanditDetailComponent {
  @Input() bandit?: UnitInterface;
  constructor(
    private route: ActivatedRoute,
    private banditService: BanditService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBandit();
  }

  getBandit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.banditService
      .getBandit(id)
      .subscribe((bandit) => (this.bandit = bandit));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.bandit) {
      this.banditService
        .updateBandit(this.bandit)
        .subscribe(() => this.goBack());
    }
  }
}
