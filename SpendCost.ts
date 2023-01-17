import DataObject from '@civ-clone/core-data-object/DataObject';
import Yield from '@civ-clone/core-yield/Yield';

interface ISpend {
  resource(): typeof Yield;
  value(): number;
}

export class SpendCost extends DataObject implements ISpend {
  #resource: typeof Yield;
  #value: number;

  constructor(resource: typeof Yield, value: number) {
    super();

    this.addKey('resource', 'value');

    this.#resource = resource;
    this.#value = value;
  }

  resource(): typeof Yield {
    return this.#resource;
  }

  value(): number {
    return this.#value;
  }
}

export default SpendCost;
