import DataObject from '@civ-clone/core-data-object/DataObject';
import Yield from '@civ-clone/core-yield/Yield';
interface ISpend {
  resource(): typeof Yield;
  value(): number;
}
export declare class SpendCost extends DataObject implements ISpend {
  #private;
  constructor(resource: typeof Yield, value: number);
  resource(): typeof Yield;
  value(): number;
}
export default SpendCost;
