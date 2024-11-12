import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UnitInterface } from '../../models/unit.interface';
import { ActivatedRoute } from '@angular/router';
import { BanditService } from '../../services/bandit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bandit-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
