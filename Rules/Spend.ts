import CityBuild from '@civ-clone/core-city-build/CityBuild';
import Rule from '@civ-clone/core-rule/Rule';
import SpendCost from '../SpendCost';

export class Spend extends Rule<[CityBuild], SpendCost> {}

export default Spend;
