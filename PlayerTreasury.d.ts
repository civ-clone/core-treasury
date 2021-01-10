import { CityBuildRegistry } from '@civ-clone/core-city-build/CityBuildRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import Player from '@civ-clone/core-player/Player';
import Yield from '@civ-clone/core-yield/Yield';
export interface IPlayerTreasury {
  buy(city: City): void;
  cost(city: City): Yield;
  player(): Player;
}
export declare class PlayerTreasury extends Yield implements IPlayerTreasury {
  #private;
  constructor(
    player: Player,
    cityBuildRegistry?: CityBuildRegistry,
    ruleRegistry?: RuleRegistry
  );
  buy(city: City): void;
  cost(city: City): Yield;
  player(): Player;
}
export default PlayerTreasury;
