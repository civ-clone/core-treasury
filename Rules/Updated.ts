import City from '@civ-clone/core-city/City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import PlayerTreasury from '../PlayerTreasury';
import Rule from '@civ-clone/core-rule/Rule';

type UpdatedArgs = [PlayerTreasury, City];

export class Updated extends Rule<UpdatedArgs, void> {}

export default Updated;

export interface IUpdatedRegistry
  extends IRuleRegistry<Updated, UpdatedArgs, void> {}
