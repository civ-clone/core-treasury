import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import PlayerTreasury from '../PlayerTreasury';
import Rule from '@civ-clone/core-rule/Rule';

export class Sold extends Rule<[CityImprovement, PlayerTreasury], void> {}

export default Sold;
