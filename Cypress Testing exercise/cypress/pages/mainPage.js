const mainPage = {
  selectors: {
    locationInput: '#full-screen-hero-search-input',
    checkInInput: '#full-screen-hero-check-in-input',
    checkOutInput: '#full-screen-hero-check-out-input',
    guestButton: '#full-screen-hero-guest-count-select',
    searchButton: '.search-widget--panel-open button[type="submit"]',
    searchResultItems: '.listbox-items .listbox-items__item',
    selectableDates: 'table td:not(.asd__day--disabled) button',
    nonSelectableDates: 'table .asd__day--disabled:not(.asd__day--today) button[disabled="disabled"]',
    selectedDate: 'table .asd__day--selected button',

    invalidDateError: '#full-screen-hero-invalid-dates-error',
  },

  selectDaysOnDatepicker(days) {
    cy.get(this.selectors.selectableDates).eq(0).click({ scrollBehavior: false });
    cy.get(this.selectors.selectableDates)
      .eq(0 + days)
      .click({ scrollBehavior: false });
  },
};

module.exports = mainPage;
