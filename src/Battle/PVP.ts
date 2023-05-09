import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  public constructor(
    private _fighter1: Fighter,
    private _fighter2: Fighter,
  ) {
    super(_fighter1);
  }

  private fighter1StillAlive() {
    return this._fighter1.lifePoints > 0;
  }

  private fighter2StillAlive() {
    return this._fighter2.lifePoints > 0;
  }

  private fightersStillAlive() {
    return this.fighter1StillAlive() && this.fighter2StillAlive();
  }

  fight(): number {
    while (this.fightersStillAlive()) {
      if (this.fighter1StillAlive()) this._fighter1.attack(this._fighter2);
      if (this.fighter2StillAlive()) this._fighter2.attack(this._fighter1);
    }
    return super.fight();
  }
}