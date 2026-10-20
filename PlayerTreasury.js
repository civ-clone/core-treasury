"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerTreasury = void 0;
const CityBuildRegistry_1 = require("@civ-clone/core-city-build/CityBuildRegistry");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
const Sell_1 = require("./Rules/Sell");
const Sold_1 = require("./Rules/Sold");
const Spend_1 = require("./Rules/Spend");
const Yield_1 = require("@civ-clone/core-yield/Yield");
const Rush_1 = require("./Rules/Rush");
class PlayerTreasury extends DataObject_1.default {
    constructor(player, YieldType, cityBuildRegistry = CityBuildRegistry_1.instance, ruleRegistry = RuleRegistry_1.instance) {
        super();
        this._value = 0;
        this.addKey('value', 'yield');
        this._cityBuildRegistry = cityBuildRegistry;
        this._player = player;
        this._ruleRegistry = ruleRegistry;
        this._yield = YieldType;
    }
    add(value) {
        if (value instanceof Yield_1.default) {
            this.add(value.value());
            return;
        }
        this._value += value;
    }
    buy(city) {
        const cityBuild = this._cityBuildRegistry.getByCity(city), [spendCost] = this.cost(city).filter((spendCost) => spendCost.resource() === this._yield), cost = spendCost === null || spendCost === void 0 ? void 0 : spendCost.value();
        // Nothing to buy when the rules give no price in this treasury's yield.
        if (cost === undefined ||
            city.player() !== this._player ||
            this.value() < cost) {
            return;
        }
        this._ruleRegistry.process(Rush_1.default, cityBuild, spendCost);
        // TODO: do this via Rules and then use Production
        cityBuild.add(new Yield_1.default(cityBuild.remaining()));
        this.subtract(cost);
    }
    cost(city) {
        const cityBuild = this._cityBuildRegistry.getByCity(city);
        return this._ruleRegistry.process(Spend_1.default, cityBuild);
    }
    player() {
        return this._player;
    }
    saleValue(cityImprovement) {
        return this._ruleRegistry.process(Sell_1.default, cityImprovement);
    }
    sell(cityImprovement) {
        const [spendCost] = this.saleValue(cityImprovement).filter((spendCost) => spendCost.resource() === this._yield), value = spendCost === null || spendCost === void 0 ? void 0 : spendCost.value();
        // Nothing to sell when the rules give no value in this treasury's yield.
        if (value === undefined ||
            cityImprovement.city().player() !== this._player ||
            cityImprovement.destroyed()) {
            return;
        }
        cityImprovement.destroy();
        this.add(value);
        this._ruleRegistry.process(Sold_1.default, cityImprovement, this);
    }
    set(value) {
        this._value = 0;
        this.add(value);
    }
    subtract(value) {
        if (value instanceof Yield_1.default) {
            this.subtract(value.value());
            return;
        }
        this._value -= value;
    }
    value() {
        return this._value;
    }
    yield() {
        return this._yield;
    }
}
exports.PlayerTreasury = PlayerTreasury;
PlayerTreasury.transient = ['_cityBuildRegistry', '_ruleRegistry'];
exports.default = PlayerTreasury;
//# sourceMappingURL=PlayerTreasury.js.map