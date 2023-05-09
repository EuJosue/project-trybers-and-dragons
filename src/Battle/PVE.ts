import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  constructor(
    private fighter: Fighter,
    private monsters: SimpleFighter[],
  ) {
    super(fighter);
  }

  private fighterStillAlive() {
    return this.fighter.lifePoints > 0;
  }

  private cleanMonstersArray() {
    this.monsters = this.monsters.filter((monster) => monster.lifePoints > 0);
  }

  private monstersStillAlive() {
    this.cleanMonstersArray();
    return this.monsters.length > 0;
  }

  private fighterAndMonstersStillAlive() {
    return this.fighterStillAlive() && this.monstersStillAlive();
  }

  fight(): number {
    while (this.fighterAndMonstersStillAlive()) {
      if (this.fighterStillAlive()) {
        this.fighter.attack(this.monsters[0]);
      }
      if (this.monstersStillAlive()) {
        this.monsters.forEach((monster) => monster.attack(this.fighter));
      }
    }

    return super.fight();
  }
}