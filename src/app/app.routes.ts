import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';
import { BanditsComponent } from './components/bandits/bandits.component';

export const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'bandits', component: BanditsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: UnitDetailComponent },
];
