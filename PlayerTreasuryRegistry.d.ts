import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerTreasury from './PlayerTreasury';
interface IPlayerTreasuryRegistry extends IEntityRegistry<PlayerTreasury> {
  getByPlayer(player: Player): PlayerTreasury;
}
export declare class PlayerTreasuryRegistry
  extends EntityRegistry<PlayerTreasury>
  implements IPlayerTreasuryRegistry
{
  constructor();
  getByPlayer(player: Player): PlayerTreasury;
}
export declare const instance: PlayerTreasuryRegistry;
export default PlayerTreasuryRegistry;
