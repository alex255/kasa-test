const config = require('../config/credentials');

const BeerApi = {
  foundBeer(filters) {
    return cy.request({
      url: `${config.beerApi}beers?${this.objToString(filters)}`,
      method: 'GET',
    });
  },

  objToString(obj) {
    let str = '';
    for (const [p, val] of Object.entries(obj)) {
      str += `${p}=${val}&`;
    }
    return str;
  },
};
module.exports = BeerApi;
