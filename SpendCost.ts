import DataObject from '@civ-clone/core-data-object/DataObject';
import Yield from '@civ-clone/core-yield/Yield';

interface ISpend {
  resource(): typeof Yield;
  value(): number;
}

export class SpendCost extends DataObject implements ISpend {
  private _resource: typeof Yield;
  private _value: number;

  constructor(resource: typeof Yield, value: number) {
    super();

    this.addKey('resource', 'value');

    this._resource = resource;
    this._value = value;
  }

  resource(): typeof Yield {
    return this._resource;
  }

  value(): number {
    return this._value;
  }
}

export default SpendCost;
