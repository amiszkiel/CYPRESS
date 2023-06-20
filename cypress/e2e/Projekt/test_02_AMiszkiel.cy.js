/// <reference types="cypress" />

import poranny from "../../fixtures/poranny.json";
import commands from "../../support/commands.js";

beforeEach("setup", () => {
  cy.visit("/");
  cy.url().should("contain", "poranny");
});

describe("Testy automatyczne dla strony www.poranny.pl", () => {
  //test case 1

  describe("Wyszukanie frazy kotkowo w wyszukiwarce", () => {
    beforeEach("akceptacja ciasteczek", () => {
      cy.closePopUpB();
    });

    //test case 4
    it("wyszukanie poprzez klikniecie lupki", () => {
      cy.KotkowoSearch();
      cy.get(poranny[3].lupka).should("be.visible").click();
      cy.KotkowoCheck();
    });

    //test case 5
    it("wyszukanie poprzez {enter}", () => {
      cy.KotkowoSearch().type("{enter}");
      cy.KotkowoCheck();
    });

    //test case 6
    it("wyszukanie z użyciem fixtures", () => {
      cy.get(".atomsNavigationIconsIcon--search").should("be.visible").click();
      cy.get("#gsc-i-id1").type(poranny[0].fraza).type("{enter}");
      cy.KotkowoCheck();
    });

    //test case 7
    it("sortowanie wyników po dacie", () => {
      cy.KotkowoSearch().type("{enter}");
      cy.get(".gsc-selected-option-container")
        .should("be.visible")
        .click({ force: true });
      cy.get(poranny[1].menu).should("be.visible");
      cy.get(poranny[2].drugie_dziecko).click({ force: true });
    });
  });
});
