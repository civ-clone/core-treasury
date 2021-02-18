import {
  PlayerTreasuryRegistry,
  instance as playerTreasuryRegistryInstance,
} from '../PlayerTreasuryRegistry';
import AdditionalData from '@civ-clone/core-data-object/AdditionalData';
import Player from '@civ-clone/core-player/Player';

export const getAdditionalData = (
  playerTreasuryRegistry: PlayerTreasuryRegistry = playerTreasuryRegistryInstance
) => [
  new AdditionalData(Player, 'treasury', (player: Player) =>
    playerTreasuryRegistry.getByPlayer(player)
  ),
];

export default getAdditionalData;
