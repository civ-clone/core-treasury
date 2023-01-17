"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const CityBuild_1 = require("@civ-clone/core-city-build/CityBuild");
const Spend_1 = require("../Rules/Spend");
const getAdditionalData = (ruleRegistry = RuleRegistry_1.instance) => [
    new AdditionalData_1.default(CityBuild_1.default, 'spendCost', (cityBuild) => ruleRegistry.process(Spend_1.default, cityBuild)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=spend-cost.js.map