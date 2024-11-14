export interface UnitInterface {
  id: number;
  name: string;
  type: UnitType;
}

export type UnitType = 'hero' | 'bandit';
