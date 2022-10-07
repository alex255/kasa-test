Cypress.Commands.add('setAppResolution', (res) => {
  cy.viewport(res.width, res.height);
});
