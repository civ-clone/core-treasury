import Player from '@civ-clone/core-player/Player';
import PlayerTreasury from '../PlayerTreasury';
import Yield from '@civ-clone/core-yield/Yield';
import { expect } from 'chai';

describe('PlayerTreasury', () => {
  const treasury = (value: number): PlayerTreasury => {
    const playerTreasury = new PlayerTreasury(new Player(), Yield);

    playerTreasury.set(value);

    return playerTreasury;
  };

  it('adds a number or a Yield', () => {
    const fromNumber = treasury(50),
      fromYield = treasury(50);

    fromNumber.add(10);
    fromYield.add(new Yield(10));

    expect(fromNumber.value()).to.equal(60);
    expect(fromYield.value()).to.equal(60);
  });

  it('subtracts a number or a Yield', () => {
    const fromNumber = treasury(50),
      fromYield = treasury(50);

    fromNumber.subtract(10);
    fromYield.subtract(new Yield(10));

    expect(fromNumber.value()).to.equal(40);
    expect(fromYield.value()).to.equal(40);
  });

  it('sets a number or a Yield', () => {
    const fromNumber = treasury(50),
      fromYield = treasury(50);

    fromNumber.set(5);
    fromYield.set(new Yield(5));

    expect(fromNumber.value()).to.equal(5);
    expect(fromYield.value()).to.equal(5);
  });
});
