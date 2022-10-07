const MainPage = require('../pages/mainPage');
const ListPage = require('../pages/listPage');
const ResultPage = require('../pages/resultPage');
const config = require('../config/credentials');
const resolutions = require('../config/resolutions');
const testData = require('../config/testData');

describe('UI Tests', { tags: ['UI'] }, () => {
  const today = new Date();

  beforeEach(() => {
    cy.setAppResolution(resolutions.fullHd);
    cy.visit(`${config.appUrl}`);
  });

  it('Not able to book single day at location #1', () => {
    const formatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location1);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${formatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${formatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(MainPage.selectors.invalidDateError).should('exist');
  });

  it('Not able to book single day at location #2', () => {
    const formatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location2);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${formatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${formatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(MainPage.selectors.invalidDateError).should('exist');
  });

  it('Not able to book single day at location #3', () => {
    const formatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location3);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${formatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${formatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(MainPage.selectors.invalidDateError).should('exist');
  });

  it('Check first selectable day on date picker is today', () => {
    cy.get(MainPage.selectors.locationInput).type(testData.locations.location1);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.selectableDates).eq(0).parent().should('have.attr', 'data-date').should('include', today.toISOString().split('T')[0]);
  });

  it('Try checkout in past using date picker', () => {
    cy.get(MainPage.selectors.locationInput).type(testData.locations.location1);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.selectableDates).eq(0).click({ scrollBehavior: false });

    cy.get(MainPage.selectors.nonSelectableDates).last().click({ scrollBehavior: false, force: true });

    cy.get(MainPage.selectors.checkOutInput).click({ scrollBehavior: false, force: true });

    cy.get(MainPage.selectors.nonSelectableDates).last().should('not.have.class', 'asd__day--selected');
  });

  it('Search at location #1', () => {
    const fromFormatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let toDate = today;
    toDate.setDate(today.getDate() + 1);
    const toFormatedDate = toDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location1);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${fromFormatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${toFormatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(ListPage.selectors.headerLocation).should('exist');
    cy.get(ListPage.selectors.headerLocation).contains(testData.locations.location1);
  });

  it('Search at location #2', () => {
    const fromFormatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let toDate = today;
    toDate.setDate(today.getDate() + 1);
    const toFormatedDate = toDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location2);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${fromFormatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${toFormatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(ListPage.selectors.headerLocation).should('exist');
    cy.get(ListPage.selectors.headerLocation).contains(testData.locations.location2);
  });

  it('Search at location #3', () => {
    const fromFormatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let toDate = today;
    toDate.setDate(today.getDate() + 1);
    const toFormatedDate = toDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location3);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${fromFormatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${toFormatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(ListPage.selectors.headerLocation).should('exist');
    cy.get(ListPage.selectors.headerLocation).contains(testData.locations.location3);
  });

  it('Check kasa has heating at location #1', () => {
    const fromFormatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    let toDate = today;

    toDate.setDate(today.getDate() + 2);
    const toFormatedDate = toDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location1);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${fromFormatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${toFormatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(ListPage.selectors.headerLocation).should('exist');

    cy.get(ListPage.selectors.detailsButtons).eq(0).click();

    cy.get(ResultPage.selectors.popup.popup).should('exist');

    cy.get(ResultPage.selectors.popup.amenitiesList).contains('Heating');
  });

  it('Check kasa has heating at location #2', () => {
    const fromFormatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let toDate = today;
    toDate.setDate(today.getDate() + 2);
    const toFormatedDate = toDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location2);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${fromFormatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${toFormatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(ListPage.selectors.headerLocation).should('exist');

    cy.get(ListPage.selectors.detailsButtons).eq(0).click();

    cy.get(ResultPage.selectors.popup.popup).should('exist');

    cy.get(ResultPage.selectors.popup.amenitiesList).contains('Heating');
  });

  it('Check kasa has heating at location #3', () => {
    const fromFormatedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let toDate = today;
    toDate.setDate(today.getDate() + 2);
    const toFormatedDate = toDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    cy.get(MainPage.selectors.locationInput).type(testData.locations.location3);

    cy.get(MainPage.selectors.searchResultItems).eq(0).click();

    cy.get(MainPage.selectors.checkInInput).type(`${fromFormatedDate}`);
    cy.get(MainPage.selectors.checkOutInput).type(`${toFormatedDate}`);

    cy.get(MainPage.selectors.searchButton).click();

    cy.get(ListPage.selectors.headerLocation).should('exist');

    cy.get(ListPage.selectors.detailsButtons).eq(0).click();

    cy.get(ResultPage.selectors.popup.popup).should('exist');

    cy.get(ResultPage.selectors.popup.amenitiesList).contains('Heating');
  });
});
