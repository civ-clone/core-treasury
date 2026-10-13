import City from '@civ-clone/core-city/City';
import CityBuild from '@civ-clone/core-city-build/CityBuild';
import CityBuildRegistry from '@civ-clone/core-city-build/CityBuildRegistry';
import Player from '@civ-clone/core-player/Player';
import PlayerTreasury from '../PlayerTreasury';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
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

  it("doesn't buy, or throw, when the rules give no price", () => {
    const player = new Player(),
      city = { player: () => player } as unknown as City;
    let added = false;

    const cityBuild = {
        city: () => city,
        remaining: () => 10,
        add: () => (added = true),
      } as unknown as CityBuild,
      cityBuildRegistry = {
        getByCity: () => cityBuild,
      } as unknown as CityBuildRegistry,
      playerTreasury = new PlayerTreasury(
        player,
        Yield,
        cityBuildRegistry,
        new RuleRegistry()
      );

    playerTreasury.set(100);

    expect(() => playerTreasury.buy(city)).not.to.throw();
    expect(playerTreasury.value()).to.equal(100);
    expect(added).to.equal(false);
  });
});
