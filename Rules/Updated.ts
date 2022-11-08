import City from '@civ-clone/core-city/City';
import PlayerTreasury from '../PlayerTreasury';
import Rule from '@civ-clone/core-rule/Rule';

export class Updated extends Rule<[PlayerTreasury, City], void> {}

export default Updated;
