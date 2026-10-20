"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdditionalData = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const AdditionalData_1 = require("@civ-clone/core-data-object/AdditionalData");
const CityImprovement_1 = require("@civ-clone/core-city-improvement/CityImprovement");
const Sell_1 = require("../Rules/Sell");
const getAdditionalData = (ruleRegistry = RuleRegistry_1.instance) => [
    new AdditionalData_1.default(CityImprovement_1.default, 'saleValue', (cityImprovement) => ruleRegistry.process(Sell_1.default, cityImprovement)),
];
exports.getAdditionalData = getAdditionalData;
exports.default = exports.getAdditionalData;
//# sourceMappingURL=sale-value.js.map