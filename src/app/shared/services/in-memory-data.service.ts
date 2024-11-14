import { Injectable } from '@angular/core';
import { UnitInterface } from '../types/unit.interface';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice', type: 'hero' },
      { id: 13, name: 'Bombasto', type: 'hero' },
      { id: 14, name: 'Celeritas', type: 'hero' },
      { id: 15, name: 'Magneta', type: 'hero' },
      { id: 16, name: 'RubberMan', type: 'hero' },
      { id: 17, name: 'Dynama', type: 'hero' },
      { id: 18, name: 'Dr. IQ', type: 'hero' },
      { id: 19, name: 'Magma', type: 'hero' },
      { id: 20, name: 'Tornado', type: 'hero' },
      { id: 21, name: 'BondLoh', type: 'hero' },
    ];
    const bandits = [
      { id: 12, name: 'Poroshenko', type: 'bandit' },
      { id: 13, name: 'Putin', type: 'bandit' },
      { id: 14, name: 'Yanukovich', type: 'bandit' },
      { id: 15, name: 'Azirov', type: 'bandit' },
      { id: 16, name: 'Ahmetov', type: 'bandit' },
      { id: 17, name: 'Avakov Chort', type: 'bandit' },
    ];
    return { heroes, bandits };
  }
  genId(heroes: UnitInterface[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 11;
  }
}
