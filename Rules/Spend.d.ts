import CityBuild from '@civ-clone/core-city-build/CityBuild';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';
declare type SpendArgs = [CityBuild, Yield];
export declare class Spend extends Rule<SpendArgs, Yield> {}
export default Spend;
export interface ISpendRegistry
  extends IRuleRegistry<Spend, SpendArgs, Yield> {}
