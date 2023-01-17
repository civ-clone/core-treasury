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
var _PlayerTreasury_cityBuildRegistry, _PlayerTreasury_player, _PlayerTreasury_ruleRegistry, _PlayerTreasury_value, _PlayerTreasury_yield;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTreasury = void 0;
const CityBuildRegistry_1 = require("@civ-clone/core-city-build/CityBuildRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Spend_1 = require("./Rules/Spend");
const Yield_1 = require("@civ-clone/core-yield/Yield");
const Rush_1 = require("./Rules/Rush");
class PlayerTreasury extends DataObject_1.default {
    constructor(player, YieldType, cityBuildRegistry = CityBuildRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) {
        super();
        _PlayerTreasury_cityBuildRegistry.set(this, void 0);
        _PlayerTreasury_player.set(this, void 0);
        _PlayerTreasury_ruleRegistry.set(this, void 0);
        _PlayerTreasury_value.set(this, 0);
        _PlayerTreasury_yield.set(this, void 0);
        this.addKey('value', 'yield');
        __classPrivateFieldSet(this, _PlayerTreasury_cityBuildRegistry, cityBuildRegistry, "f");
        __classPrivateFieldSet(this, _PlayerTreasury_player, player, "f");
        __classPrivateFieldSet(this, _PlayerTreasury_ruleRegistry, ruleRegistry, "f");
        __classPrivateFieldSet(this, _PlayerTreasury_yield, YieldType, "f");
    }
    add(value) {
        if (value instanceof Yield_1.default) {
            this.add(value.value());
            return;
        }
        __classPrivateFieldSet(this, _PlayerTreasury_value, __classPrivateFieldGet(this, _PlayerTreasury_value, "f") + value, "f");
    }
    buy(city) {
        const cityBuild = __classPrivateFieldGet(this, _PlayerTreasury_cityBuildRegistry, "f").getByCity(city), [spendCost] = this.cost(city).filter((spendCost) => spendCost.resource() === __classPrivateFieldGet(this, _PlayerTreasury_yield, "f")), cost = spendCost.value();
        if (city.player() !== __classPrivateFieldGet(this, _PlayerTreasury_player, "f") || this.value() < cost) {
            return;
        }
        __classPrivateFieldGet(this, _PlayerTreasury_ruleRegistry, "f").process(Rush_1.default, cityBuild, spendCost);
        // TODO: do this via Rules and then use Production
        cityBuild.add(new Yield_1.default(cityBuild.remaining()));
        this.subtract(cost);
    }
    cost(city) {
        const cityBuild = __classPrivateFieldGet(this, _PlayerTreasury_cityBuildRegistry, "f").getByCity(city);
        return __classPrivateFieldGet(this, _PlayerTreasury_ruleRegistry, "f").process(Spend_1.default, cityBuild);
    }
    player() {
        return __classPrivateFieldGet(this, _PlayerTreasury_player, "f");
    }
    set(value) {
        __classPrivateFieldSet(this, _PlayerTreasury_value, 0, "f");
        this.add(value);
    }
    subtract(value) {
        if (value instanceof Yield_1.default) {
            this.add(value.value());
            return;
        }
        __classPrivateFieldSet(this, _PlayerTreasury_value, __classPrivateFieldGet(this, _PlayerTreasury_value, "f") - value, "f");
    }
    value() {
        return __classPrivateFieldGet(this, _PlayerTreasury_value, "f");
    }
    yield() {
        return __classPrivateFieldGet(this, _PlayerTreasury_yield, "f");
    }
}
exports.PlayerTreasury = PlayerTreasury;
_PlayerTreasury_cityBuildRegistry = new WeakMap(), _PlayerTreasury_player = new WeakMap(), _PlayerTreasury_ruleRegistry = new WeakMap(), _PlayerTreasury_value = new WeakMap(), _PlayerTreasury_yield = new WeakMap();
exports.default = PlayerTreasury;
//# sourceMappingURL=PlayerTreasury.js.map