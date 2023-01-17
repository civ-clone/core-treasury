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
export declare class PlayerTreasuryRegistry
  extends EntityRegistry<PlayerTreasury>
  implements IPlayerTreasuryRegistry
{
  constructor();
  getByPlayer(player: Player): PlayerTreasury[];
  getByPlayerAndType(player: Player, YieldType: typeof Yield): PlayerTreasury;
}
export declare const instance: PlayerTreasuryRegistry;
export default PlayerTreasuryRegistry;
