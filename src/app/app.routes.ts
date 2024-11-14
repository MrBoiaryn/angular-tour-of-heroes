import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { BanditsComponent } from './components/bandits/bandits.component';
import { BanditDetailComponent } from './components/bandit-detail/bandit-detail.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';

export const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'bandits', component: BanditsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'bandit/:id', component: BanditDetailComponent },
  { path: 'unit/:id', component: UnitDetailComponent },
];
