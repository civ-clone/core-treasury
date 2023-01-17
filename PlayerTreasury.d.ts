import { CityBuildRegistry } from '@civ-clone/core-city-build/CityBuildRegistry';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Player from '@civ-clone/core-player/Player';
import SpendCost from './SpendCost';
import Yield from '@civ-clone/core-yield/Yield';
export interface IPlayerTreasury {
  add(value: Yield | number, provider: string): void;
  buy(city: City): void;
  cost(city: City): SpendCost[];
  player(): Player;
  set(value: Yield | number, provider: string): void;
  subtract(value: Yield | number, provider: string): void;
  yield(): typeof Yield;
}
export declare class PlayerTreasury
  extends DataObject
  implements IPlayerTreasury
{
  #private;
  constructor(
    player: Player,
    YieldType: typeof Yield,
    cityBuildRegistry?: CityBuildRegistry,
    ruleRegistry?: RuleRegistry
  );
  add(value: Yield | number): void;
  buy(city: City): void;
  cost(city: City): SpendCost[];
  player(): Player;
  set(value: Yield | number): void;
  subtract(value: Yield | number): void;
  value(): number;
  yield(): typeof Yield;
}
export default PlayerTreasury;
