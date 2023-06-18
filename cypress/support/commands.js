Cypress.Commands.add("closePopUpB", () => {
  cy.get("body").then(($body) => {
    if ($body.find("#didomi-notice-agree-button > span").length > 0) {
      cy.get("#didomi-notice-agree-button > span").then(($button) => {
        if ($button.is(":visible")) {
          cy.wrap($button).click();
        }
      });
    }
  });
});

Cypress.Commands.add("acceptAllConsents", () => {
  for (let i = 1; i <= 12; i++) {
    cy.get(
      `:nth-child(${i}) > .didomi-consent-popup-data-processing > .didomi-consent-popup-data-processing__buttons_tcf_v2 > .didomi-components-radio > :nth-child(1) > span`
    )
      .should("be.visible")
      .click();
  }

  cy.get(".didomi-consent-popup-actions > .didomi-components-button > span")
    .should("be.visible")
    .click();
});

Cypress.Commands.add("KotkowoSearch", () => {
  cy.get(".atomsNavigationIconsIcon--search").should("be.visible").click();
  cy.get("#gsc-i-id1").type("kotkowo");
});

Cypress.Commands.add("KotkowoCheck", () => {
  cy.url().should("contain", "kotkowo");
});
