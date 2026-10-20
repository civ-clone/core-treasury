import {
  CityBuildRegistry,
  instance as cityBuildRegistryInstance,
} from '@civ-clone/core-city-build/CityBuildRegistry';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import City from '@civ-clone/core-city/City';
import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import DataObject from '@civ-clone/core-data-object/DataObject';
import Player from '@civ-clone/core-player/Player';
import Sell from './Rules/Sell';
import Sold from './Rules/Sold';
import Spend from './Rules/Spend';
import SpendCost from './SpendCost';
import Yield from '@civ-clone/core-yield/Yield';
import Rush from './Rules/Rush';

export interface IPlayerTreasury {
  add(value: Yield | number, provider: string): void;
  buy(city: City): void;
  cost(city: City): SpendCost[];
  player(): Player;
  saleValue(cityImprovement: CityImprovement): SpendCost[];
  sell(cityImprovement: CityImprovement): void;
  set(value: Yield | number, provider: string): void;
  subtract(value: Yield | number, provider: string): void;
  yield(): typeof Yield;
}

export class PlayerTreasury extends DataObject implements IPlayerTreasury {
  static readonly transient = ['_cityBuildRegistry', '_ruleRegistry'];
  private _cityBuildRegistry: CityBuildRegistry;
  private _player: Player;
  private _ruleRegistry: RuleRegistry;
  private _value: number = 0;
  private _yield: typeof Yield;

  constructor(
    player: Player,
    YieldType: typeof Yield,
    cityBuildRegistry: CityBuildRegistry = cityBuildRegistryInstance,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super();

    this.addKey('value', 'yield');

    this._cityBuildRegistry = cityBuildRegistry;
    this._player = player;
    this._ruleRegistry = ruleRegistry;
    this._yield = YieldType;
  }

  add(value: Yield | number): void {
    if (value instanceof Yield) {
      this.add(value.value());

      return;
    }

    this._value += value;
  }

  buy(city: City): void {
    const cityBuild = this._cityBuildRegistry.getByCity(city),
      [spendCost] = this.cost(city).filter(
        (spendCost) => spendCost.resource() === this._yield
      ),
      cost = spendCost?.value();

    // Nothing to buy when the rules give no price in this treasury's yield.
    if (
      cost === undefined ||
      city.player() !== this._player ||
      this.value() < cost
    ) {
      return;
    }

    this._ruleRegistry.process(Rush, cityBuild, spendCost);
    // TODO: do this via Rules and then use Production
    cityBuild.add(new Yield(cityBuild.remaining()));

    this.subtract(cost);
  }

  cost(city: City): SpendCost[] {
    const cityBuild = this._cityBuildRegistry.getByCity(city);

    return this._ruleRegistry.process(Spend, cityBuild);
  }

  player(): Player {
    return this._player;
  }

  saleValue(cityImprovement: CityImprovement): SpendCost[] {
    return this._ruleRegistry.process(Sell, cityImprovement);
  }

  sell(cityImprovement: CityImprovement): void {
    const [spendCost] = this.saleValue(cityImprovement).filter(
        (spendCost) => spendCost.resource() === this._yield
      ),
      value = spendCost?.value();

    // Nothing to sell when the rules give no value in this treasury's yield.
    if (
      value === undefined ||
      cityImprovement.city().player() !== this._player ||
      cityImprovement.destroyed()
    ) {
      return;
    }

    cityImprovement.destroy();

    this.add(value);

    this._ruleRegistry.process(Sold, cityImprovement, this);
  }

  set(value: Yield | number): void {
    this._value = 0;

    this.add(value);
  }

  subtract(value: Yield | number): void {
    if (value instanceof Yield) {
      this.subtract(value.value());

      return;
    }

    this._value -= value;
  }

  value(): number {
    return this._value;
  }

  yield(): typeof Yield {
    return this._yield;
  }
}

export default PlayerTreasury;
