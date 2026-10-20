import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import Rule from '@civ-clone/core-rule/Rule';
import SpendCost from '../SpendCost';

// What a `CityImprovement` sells for. No result means it can't be sold now.
export class Sell extends Rule<[CityImprovement], SpendCost> {}

export default Sell;
