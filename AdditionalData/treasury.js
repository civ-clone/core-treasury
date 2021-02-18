"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const PlayerTreasuryRegistry_1 = require("../PlayerTreasuryRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const Player_1 = require("@civ-clone/core-player/Player");
const getAdditionalData = (playerTreasuryRegistry = PlayerTreasuryRegistry_1.instance) => [
    new AdditionalData_1.default(Player_1.default, 'treasury', (player) => playerTreasuryRegistry.getByPlayer(player)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=treasury.js.map