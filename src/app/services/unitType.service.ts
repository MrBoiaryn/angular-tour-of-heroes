import { Injectable } from '@angular/core';
import { UnitType } from '../models/unit.interface';

export interface UnitTypeServiceInterface {
  getUnitType(): UnitType;
  setUnitType(unitType: UnitType): void;
}

@Injectable({
  providedIn: 'root',
})
export class UnitTypeService implements UnitTypeServiceInterface {
  unitType!: UnitType;

  constructor() {}

  getUnitType(): UnitType {
    return this.unitType;
  }

  setUnitType(unitType: UnitType): void {
    this.unitType = unitType;
  }
}
