import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import spendCost from './AdditionalData/spend-cost';
import treasury from './AdditionalData/treasuries';

additionalDataRegistryInstance.register(...spendCost(), ...treasury());
