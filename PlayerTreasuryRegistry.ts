import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerTreasury from './PlayerTreasury';

interface IPlayerTreasuryRegistry extends IEntityRegistry<PlayerTreasury> {
  getByPlayer(player: Player): PlayerTreasury;
}

export class PlayerTreasuryRegistry
  extends EntityRegistry<PlayerTreasury>
  implements IPlayerTreasuryRegistry
{
  constructor() {
    super(PlayerTreasury);
  }

  getByPlayer(player: Player): PlayerTreasury {
    const playerTreasuries = this.getBy('player', player);

    if (playerTreasuries.length !== 1) {
      throw new TypeError('Wrong number of PlayerTreasuries for player.');
    }

    return playerTreasuries[0];
  }
}

export const instance: PlayerTreasuryRegistry = new PlayerTreasuryRegistry();

export default PlayerTreasuryRegistry;
