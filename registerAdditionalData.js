"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdditionalDataRegistry_1 = require("@civ-clone/core-data-object/AdditionalDataRegistry");
const spend_cost_1 = require("./AdditionalData/spend-cost");
const treasuries_1 = require("./AdditionalData/treasuries");
AdditionalDataRegistry_1.instance.register(...(0, spend_cost_1.default)(), ...(0, treasuries_1.default)());
//# sourceMappingURL=registerAdditionalData.js.map