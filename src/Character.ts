import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';

type CharacterOptions = {
  strength?: number;
  defense?: number;
  dexterity?: number;
  race?: Race;
  archetype?: Archetype;
};

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(private _name: string, {
    strength = Character.randomStats(),
    defense = Character.randomStats(),
    dexterity = Character.randomStats(),
    race,
    archetype,
  }: CharacterOptions = {}) {
    this._strength = strength;
    this._dexterity = dexterity;
    this._defense = defense;

    if (race === undefined) this._race = new Elf(this._name, this._dexterity);
    else this._race = race;
    
    if (archetype === undefined) this._archetype = new Mage(this._name);
    else this._archetype = archetype;
    
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;

    this._energy = { type_: this._archetype.energyType,
      amount: Character.randomStats() };
  }

  get name(): string { return this._name; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get lifePoints(): number { return this._lifePoints; }
  get energy(): Energy { return { ...this._energy }; }
  get race(): Race { return this._race; }
  get archetype(): Archetype { return this._archetype; }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  special?(enemy: Fighter): void {
    if (this._energy.amount < this._archetype.cost) {
      throw new Error('Not enough energy');
    }

    this._energy.amount -= this._archetype.cost;

    enemy.receiveDamage(this._strength + this._archetype.special);
  }

  levelUp(): void {
    this._strength += Character.randomStats();
    this._defense += Character.randomStats();
    this._dexterity += Character.randomStats();
    this._maxLifePoints += Character.randomStats();

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    
    this._energy.amount = 10;

    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    const reducedDamage = damage > 0 ? damage : 1;

    this._lifePoints -= reducedDamage;

    if (this._lifePoints <= 0) this._lifePoints = -1;

    return this._lifePoints;
  }

  private static randomStats() { return Math.floor(Math.random() * 10) + 1; }
}