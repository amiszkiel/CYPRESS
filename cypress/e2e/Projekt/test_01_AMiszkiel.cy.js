/// <reference types="cypress" />

import poranny from "../../fixtures/poranny.json";
import commands from "../../support/commands.js";

beforeEach("setup", () => {
  cy.visit("/");
  cy.url().should("contain", "poranny");
});

describe("Testy automatyczne dla strony www.poranny.pl", () => {
  //test case 1
  describe("Sprawdzenie statusu odpowiedzi serwera", () => {
    it("sprawdzenie statusu 200", () => {
      cy.request("www.poranny.pl").then((response) => {
        expect(response.status).to.eq(200);
        if (response.status !== 200) {
          Cypress.runner.stop();
        }
      });
    });
  });

  describe("Testy pop-upu z ciasteczkami", () => {
    //test case 2
    it("akcpetacja ciasteczek", () => {
      cy.closePopUpB();
    });

    //test case 3
    it("odrzucenie wszystkich ciasteczek", () => {
      cy.get("body").then(($body) => {
        if (Cypress.$("#didomi-notice-learn-more-button > span").length > 0) {
          cy.get("#didomi-notice-learn-more-button > span")
            .should("be.visible")
            .click()
            .then(() => {
              cy.acceptAllConsents();
            });
        }
      });
    });
  });
});
