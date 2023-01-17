import {
  CityBuildRegistry,
  instance as cityBuildRegistryInstance,
} from '@civ-clone/core-city-build/CityBuildRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Player from '@civ-clone/core-player/Player';
import Spend from './Rules/Spend';
import SpendCost from './SpendCost';
import Yield from '@civ-clone/core-yield/Yield';
import Rush from './Rules/Rush';

export interface IPlayerTreasury {
  add(value: Yield | number, provider: string): void;
  buy(city: City): void;
  cost(city: City): SpendCost[];
  player(): Player;
  set(value: Yield | number, provider: string): void;
  subtract(value: Yield | number, provider: string): void;
  yield(): typeof Yield;
}

export class PlayerTreasury extends DataObject implements IPlayerTreasury {
  #cityBuildRegistry: CityBuildRegistry;
  #player: Player;
  #ruleRegistry: RuleRegistry;
  #value: number = 0;
  #yield: typeof Yield;

  constructor(
    player: Player,
    YieldType: typeof Yield,
    cityBuildRegistry: CityBuildRegistry = cityBuildRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this.addKey('value', 'yield');

    this.#cityBuildRegistry = cityBuildRegistry;
    this.#player = player;
    this.#ruleRegistry = ruleRegistry;
    this.#yield = YieldType;
  }

  add(value: Yield | number): void {
    if (value instanceof Yield) {
      this.add(value.value());

      return;
    }

    this.#value += value;
  }

  buy(city: City): void {
    const cityBuild = this.#cityBuildRegistry.getByCity(city),
      [spendCost] = this.cost(city).filter(
        (spendCost) => spendCost.resource() === this.#yield
      ),
      cost = spendCost.value();

    if (city.player() !== this.#player || this.value() < cost) {
      return;
    }

    this.#ruleRegistry.process(Rush, cityBuild, spendCost);
    // TODO: do this via Rules and then use Production
    cityBuild.add(new Yield(cityBuild.remaining()));

    this.subtract(cost);
  }

  cost(city: City): SpendCost[] {
    const cityBuild = this.#cityBuildRegistry.getByCity(city);

    return this.#ruleRegistry.process(Spend, cityBuild);
  }

  player(): Player {
    return this.#player;
  }

  set(value: Yield | number): void {
    this.#value = 0;

    this.add(value);
  }

  subtract(value: Yield | number): void {
    if (value instanceof Yield) {
      this.add(value.value());

      return;
    }

    this.#value -= value;
  }

  value(): number {
    return this.#value;
  }

  yield(): typeof Yield {
    return this.#yield;
  }
}

export default PlayerTreasury;
