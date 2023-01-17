import CityBuild from '@civ-clone/core-city-build/CityBuild';
import Rule from '@civ-clone/core-rule/Rule';
import SpendCost from '../SpendCost';

export class Rush extends Rule<[CityBuild, SpendCost], void> {}

export default Rush;
