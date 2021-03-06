import {
  CityBuildRegistry,
  instance as cityBuildRegistryInstance,
} from '@civ-clone/core-city-build/CityBuildRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import { Spend, ISpendRegistry } from './Rules/Spend';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import Yield from '@civ-clone/core-yield/Yield';

export interface IPlayerTreasury {
  buy(city: City): void;
  cost(city: City): Yield;
  player(): Player;
}

export class PlayerTreasury extends Yield implements IPlayerTreasury {
  #player: Player;
  #ruleRegistry: RuleRegistry;
  #cityBuildRegistry: CityBuildRegistry;

  constructor(
    player: Player,
    cityBuildRegistry: CityBuildRegistry = cityBuildRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this.#player = player;
    this.#ruleRegistry = ruleRegistry;
    this.#cityBuildRegistry = cityBuildRegistry;
  }

  buy(city: City): void {
    const cityBuild = this.#cityBuildRegistry.getByCity(city),
      cost = this.cost(city);
    if (city.player() !== this.#player || this.value() < cost.value()) {
      return;
    }

    // TODO: do this via Rules and then use Production
    cityBuild.add(new Yield(cityBuild.remaining()));

    this.subtract(cost.value());
  }

  cost(city: City): Yield {
    const cityBuild = this.#cityBuildRegistry.getByCity(city),
      // TODO: do this via Rules and then use Gold
      cost = new Yield();
    (this.#ruleRegistry as ISpendRegistry).process(Spend, cityBuild, cost);

    return cost;
  }

  player(): Player {
    return this.#player;
  }
}

export default PlayerTreasury;
