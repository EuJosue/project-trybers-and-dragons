import Race from './Race';

export default class Orc extends Race {
  private _maxLifePoints = 74;
  static instances = 0;

  constructor(name: string, dexterity: number) {
    super(name, dexterity);
    
    Orc.instances += 1;
  }

  static createdRacesInstances(): number {
    return Orc.instances;
  }

  public get maxLifePoints(): number { return this._maxLifePoints; }
}