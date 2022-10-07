const BeerApi = require('../api/beerApi');

describe('Beer API tests', { tags: ['API'] }, () => {
  it('Find best beer', () => {
    const filters = {
      yeast: 'American Ale',
      hops: 'Chinook',
    };

    let bestBeers = [];

    BeerApi.foundBeer(filters).then((result) => {
      console.log('All beers with filter:');
      console.log(result);

      for (const beer of result.body) {
        let foundWithCheese = false;
        let foundWithBourbonTip = false;

        for (const food of beer.food_pairing) {
          if (food.includes('cheese')) {
            foundWithCheese = true;
          }
        }

        if (beer.brewers_tips.includes('bourbon')) {
          foundWithBourbonTip = true;
        }

        if (foundWithCheese && foundWithBourbonTip) {
          bestBeers.push(beer);
        }
      }

      console.log('Founded best beers:');
      console.log(bestBeers);

      let bestBeerNames = [];
      for (const beer of bestBeers) {
        bestBeerNames.push(beer.name);
      }

      expect(bestBeers.length, `Best beers founded: ${bestBeerNames.join()}`).to.be.greaterThan(0);
    });
  });
});
