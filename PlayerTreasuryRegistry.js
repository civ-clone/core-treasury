"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.PlayerTreasuryRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const PlayerTreasury_1 = require("./PlayerTreasury");
class PlayerTreasuryRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(PlayerTreasury_1.default);
    }
    getByPlayer(player) {
        return this.getBy('player', player);
    }
    getByPlayerAndType(player, YieldType) {
        const playerTreasuries = this.filter((playerTreasury) => playerTreasury.player() === player &&
            playerTreasury.yield() === YieldType);
        if (playerTreasuries.length !== 1) {
            throw new TypeError(`Wrong number of playerTreasuries: ${playerTreasuries.length}`);
        }
        return playerTreasuries[0];
    }
}
exports.PlayerTreasuryRegistry = PlayerTreasuryRegistry;
exports.instance = new PlayerTreasuryRegistry();
exports.default = PlayerTreasuryRegistry;
//# sourceMappingURL=PlayerTreasuryRegistry.js.map