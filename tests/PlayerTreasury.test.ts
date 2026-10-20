import City from '@civ-clone/core-city/City';
import CityBuild from '@civ-clone/core-city-build/CityBuild';
import CityBuildRegistry from '@civ-clone/core-city-build/CityBuildRegistry';
import CityImprovement from '@civ-clone/core-city-improvement/CityImprovement';
import Criterion from '@civ-clone/core-rule/Criterion';
import Effect from '@civ-clone/core-rule/Effect';
import Player from '@civ-clone/core-player/Player';
import PlayerTreasury from '../PlayerTreasury';
import RuleRegistry from '@civ-clone/core-rule/RuleRegistry';
import Sell from '../Rules/Sell';
import Sold from '../Rules/Sold';
import SpendCost from '../SpendCost';
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

  describe('sell', () => {
    class Temple extends CityImprovement {}
    class Wonder extends CityImprovement {}

    const setup = () => {
      const player = new Player(),
        city = { player: () => player } as unknown as City,
        ruleRegistry = new RuleRegistry(),
        sold: CityImprovement[] = [];

      ruleRegistry.register(
        new Sell(
          new Criterion(
            (cityImprovement: CityImprovement): boolean =>
              !(cityImprovement instanceof Wonder)
          ),
          new Effect((): SpendCost => new SpendCost(Yield, 40))
        ),
        new Sold(
          new Effect((cityImprovement: CityImprovement): void => {
            sold.push(cityImprovement);
          })
        )
      );

      const playerTreasury = new PlayerTreasury(
        player,
        Yield,
        new CityBuildRegistry(),
        ruleRegistry
      );

      playerTreasury.set(10);

      return { city, playerTreasury, ruleRegistry, sold };
    };

    it('gives the value the rules give', () => {
      const { city, playerTreasury, ruleRegistry } = setup(),
        [spendCost] = playerTreasury.saleValue(new Temple(city, ruleRegistry));

      expect(spendCost.resource()).to.equal(Yield);
      expect(spendCost.value()).to.equal(40);
      expect(
        playerTreasury.saleValue(new Wonder(city, ruleRegistry))
      ).to.have.length(0);
    });

    it('destroys the improvement, adds its value and processes Sold', () => {
      const { city, playerTreasury, ruleRegistry, sold } = setup(),
        temple = new Temple(city, ruleRegistry);

      playerTreasury.sell(temple);

      expect(temple.destroyed()).to.equal(true);
      expect(playerTreasury.value()).to.equal(50);
      expect(sold).to.deep.equal([temple]);
    });

    it("doesn't sell what the rules give no value for", () => {
      const { city, playerTreasury, ruleRegistry, sold } = setup(),
        wonder = new Wonder(city, ruleRegistry);

      playerTreasury.sell(wonder);

      expect(wonder.destroyed()).to.equal(false);
      expect(playerTreasury.value()).to.equal(10);
      expect(sold).to.have.length(0);
    });

    it("doesn't sell another player's improvement", () => {
      const { playerTreasury, ruleRegistry, sold } = setup(),
        other = new Player(),
        temple = new Temple(
          { player: () => other } as unknown as City,
          ruleRegistry
        );

      playerTreasury.sell(temple);

      expect(temple.destroyed()).to.equal(false);
      expect(playerTreasury.value()).to.equal(10);
      expect(sold).to.have.length(0);
    });

    it("doesn't sell an improvement twice", () => {
      const { city, playerTreasury, ruleRegistry, sold } = setup(),
        temple = new Temple(city, ruleRegistry);

      playerTreasury.sell(temple);
      playerTreasury.sell(temple);

      expect(playerTreasury.value()).to.equal(50);
      expect(sold).to.have.length(1);
    });
  });
});
