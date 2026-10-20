import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import saleValue from './AdditionalData/sale-value';
import spendCost from './AdditionalData/spend-cost';
import treasury from './AdditionalData/treasuries';

additionalDataRegistryInstance.register(
  ...saleValue(),
  ...spendCost(),
  ...treasury()
);
