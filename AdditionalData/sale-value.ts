import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import Sell from '../Rules/Sell';

export const getAdditionalData = (
  ruleRegistry: RuleRegistry = ruleRegistryInstance
) => [
  new AdditionalData(
    CityImprovement,
    'saleValue',
    (cityImprovement: CityImprovement) =>
      ruleRegistry.process(Sell, cityImprovement)
  ),
];

export default getAdditionalData;
