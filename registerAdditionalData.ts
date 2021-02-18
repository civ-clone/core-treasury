import { instance as additionalDataRegistryInstance } from '@civ-clone/core-data-object/AdditionalDataRegistry';
import treasury from './AdditionalData/treasury';

additionalDataRegistryInstance.register(...treasury());
