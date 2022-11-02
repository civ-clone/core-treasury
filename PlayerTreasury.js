"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PlayerTreasury_player, _PlayerTreasury_ruleRegistry, _PlayerTreasury_cityBuildRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTreasury = void 0;
const CityBuildRegistry_1 = require("@civ-clone/core-city-build/CityBuildRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Spend_1 = require("./Rules/Spend");
const Yield_1 = require("@civ-clone/core-yield/Yield");
class PlayerTreasury extends Yield_1.default {
    constructor(player, cityBuildRegistry = CityBuildRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _PlayerTreasury_player.set(this, void 0);
        _PlayerTreasury_ruleRegistry.set(this, void 0);
        _PlayerTreasury_cityBuildRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _PlayerTreasury_player, player, "f");
        __classPrivateFieldSet(this, _PlayerTreasury_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldSet(this, _PlayerTreasury_cityBuildRegistry, cityBuildRegistry, "f");
    }
    buy(city) {
        const cityBuild = __classPrivateFieldGet(this, _PlayerTreasury_cityBuildRegistry, "f").getByCity(city), cost = this.cost(city);
        if (city.player() !== __classPrivateFieldGet(this, _PlayerTreasury_player, "f") || this.value() < cost.value()) {
            return;
        }
        // TODO: do this via Rules and then use Production
        cityBuild.add(new Yield_1.default(cityBuild.remaining()));
        this.subtract(cost.value());
    }
    cost(city) {
        const cityBuild = __classPrivateFieldGet(this, _PlayerTreasury_cityBuildRegistry, "f").getByCity(city);
        return __classPrivateFieldGet(this, _PlayerTreasury_ruleRegistry, "f")
            .process(Spend_1.default, cityBuild)
            .reduce((totalYield, currentYield) => {
            totalYield.add(currentYield);
            return totalYield;
        });
    }
    player() {
        return __classPrivateFieldGet(this, _PlayerTreasury_player, "f");
    }
}
exports.PlayerTreasury = PlayerTreasury;
_PlayerTreasury_player = new WeakMap(), _PlayerTreasury_ruleRegistry = new WeakMap(), _PlayerTreasury_cityBuildRegistry = new WeakMap();
exports.default = PlayerTreasury;
//# sourceMappingURL=PlayerTreasury.js.map