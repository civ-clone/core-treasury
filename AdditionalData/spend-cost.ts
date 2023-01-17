import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import CityBuild from '@civ-clone/core-city-build/CityBuild';
import Spend from '../Rules/Spend';

export const getAdditionalData = (
  ruleRegistry: RuleRegistry = ruleRegistryInstance
) => [
  new AdditionalData(CityBuild, 'spendCost', (cityBuild: CityBuild) =>
    ruleRegistry.process(Spend, cityBuild)
  ),
];

export default getAdditionalData;
