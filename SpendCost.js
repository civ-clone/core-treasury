"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpendCost = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class SpendCost extends DataObject_1.default {
    constructor(resource, value) {
        super();
        this.addKey('resource', 'value');
        this._resource = resource;
        this._value = value;
    }
    resource() {
        return this._resource;
    }
    value() {
        return this._value;
    }
}
exports.SpendCost = SpendCost;
exports.default = SpendCost;
//# sourceMappingURL=SpendCost.js.map