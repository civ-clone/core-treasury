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
var _SpendCost_resource, _SpendCost_value;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpendCost = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
class SpendCost extends DataObject_1.default {
    constructor(resource, value) {
        super();
        _SpendCost_resource.set(this, void 0);
        _SpendCost_value.set(this, void 0);
        this.addKey('resource', 'value');
        __classPrivateFieldSet(this, _SpendCost_resource, resource, "f");
        __classPrivateFieldSet(this, _SpendCost_value, value, "f");
    }
    resource() {
        return __classPrivateFieldGet(this, _SpendCost_resource, "f");
    }
    value() {
        return __classPrivateFieldGet(this, _SpendCost_value, "f");
    }
}
exports.SpendCost = SpendCost;
_SpendCost_resource = new WeakMap(), _SpendCost_value = new WeakMap();
exports.default = SpendCost;
//# sourceMappingURL=SpendCost.js.map