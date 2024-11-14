import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnitInterface } from '../../models/unit.interface';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { BanditService } from '../../services/bandit.service';
import { UnitTypeService } from '../../services/unitType.service';

@Component({
  selector: 'app-unit-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-detail.component.html',
  styleUrl: './unit-detail.component.scss',
})
export class UnitDetailComponent implements OnInit {
  @Input() unit?: UnitInterface;
  // unit?: UnitInterface;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private banditService: BanditService,
    private location: Location,
    private unitTypeService: UnitTypeService
  ) {}

  ngOnInit(): void {
    this.getUnit();
    console.log(
      'Hello from UnitTypeComponent',
      this.unitTypeService.getUnitType()
    );
  }

  getUnit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.unitTypeService.getUnitType() === 'hero'
      ? this.getHero(id)
      : this.getBandit(id);
  }

  getHero(id: number): void {
    this.heroService.getHero(id).subscribe((hero) => (this.unit = hero));
  }

  getBandit(id: number): void {
    this.banditService
      .getBandit(id)
      .subscribe((bandit) => (this.unit = bandit));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.unit) {
      this.heroService.updateHero(this.unit).subscribe(() => this.goBack());
    }
  }
}
