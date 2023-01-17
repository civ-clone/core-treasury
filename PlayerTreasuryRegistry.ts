import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerTreasury from './PlayerTreasury';
import Yield from '@civ-clone/core-yield/Yield';

interface IPlayerTreasuryRegistry extends IEntityRegistry<PlayerTreasury> {
  getByPlayer(player: Player): PlayerTreasury[];
  getByPlayerAndType(player: Player, YieldType: typeof Yield): PlayerTreasury;
}

export class PlayerTreasuryRegistry
  extends EntityRegistry<PlayerTreasury>
  implements IPlayerTreasuryRegistry
{
  constructor() {
    super(PlayerTreasury);
  }

  getByPlayer(player: Player): PlayerTreasury[] {
    return this.getBy('player', player);
  }

  getByPlayerAndType(player: Player, YieldType: typeof Yield): PlayerTreasury {
    const playerTreasuries = this.filter(
      (playerTreasury: PlayerTreasury): boolean =>
        playerTreasury.player() === player &&
        playerTreasury.yield() === YieldType
    );

    if (playerTreasuries.length !== 1) {
      throw new TypeError(
        `Wrong number of playerTreasuries: ${playerTreasuries.length}`
      );
    }

    return playerTreasuries[0];
  }
}

export const instance: PlayerTreasuryRegistry = new PlayerTreasuryRegistry();

export default PlayerTreasuryRegistry;
