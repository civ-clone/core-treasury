"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _player, _ruleRegistry, _cityBuildRegistry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTreasury = void 0;
const CityBuildRegistry_1 = require("@civ-clone/core-city-build/CityBuildRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Spend_1 = require("./Rules/Spend");
const Yield_1 = require("@civ-clone/core-yield/Yield");
class PlayerTreasury extends Yield_1.default {
    constructor(player, cityBuildRegistry = CityBuildRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _player.set(this, void 0);
        _ruleRegistry.set(this, void 0);
        _cityBuildRegistry.set(this, void 0);
        __classPrivateFieldSet(this, _player, player);
        __classPrivateFieldSet(this, _ruleRegistry, ruleRegistry);
        __classPrivateFieldSet(this, _cityBuildRegistry, cityBuildRegistry);
    }
    buy(city) {
        const cityBuild = __classPrivateFieldGet(this, _cityBuildRegistry).getByCity(city), cost = this.cost(city);
        if (city.player() !== __classPrivateFieldGet(this, _player) || this.value() < cost.value()) {
            return;
        }
        // TODO: do this via Rules and then use Production
        cityBuild.add(new Yield_1.default(cityBuild.remaining()));
        this.subtract(cost.value());
    }
    cost(city) {
        const cityBuild = __classPrivateFieldGet(this, _cityBuildRegistry).getByCity(city), 
        // TODO: do this via Rules and then use Gold
        cost = new Yield_1.default();
        __classPrivateFieldGet(this, _ruleRegistry).process(Spend_1.Spend, cityBuild, cost);
        return cost;
    }
    player() {
        return __classPrivateFieldGet(this, _player);
    }
}
exports.PlayerTreasury = PlayerTreasury;
_player = new WeakMap(), _ruleRegistry = new WeakMap(), _cityBuildRegistry = new WeakMap();
exports.default = PlayerTreasury;
//# sourceMappingURL=PlayerTreasury.js.map