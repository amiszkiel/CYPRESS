/// <reference types="cypress" />

import KurierPoranny from "../../fixtures/KurierPoranny.json";
import commands from "../../support/commands.js";

beforeEach("setup", () => {
  cy.visit("/");
  cy.url().should("contain", "poranny");
});

describe("Testy automatyczne dla strony www.poranny.pl", () => {
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
    it("akcpetacja ciasteczek", () => {
      cy.closePopUpB();
    });

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

  describe("Wyszukanie frazy kotkowo w wyszukiwarce", () => {
    beforeEach("akceptacja ciasteczek", () => {
      cy.closePopUpB();
    });

    it("wyszukanie poprzez klikniecie lupki", () => {
      cy.KotkowoSearch();
      cy.get(KurierPoranny[3].lupka).should("be.visible").click();
      cy.KotkowoCheck();
    });

    it("wyszukanie poprzez {enter}", () => {
      cy.KotkowoSearch().type("{enter}");
      cy.KotkowoCheck();
    });

    it("wyszukanie z użyciem fixtures", () => {
      cy.get(".atomsNavigationIconsIcon--search").should("be.visible").click();
      cy.get("#gsc-i-id1").type(KurierPoranny[0].fraza).type("{enter}");
      cy.KotkowoCheck();
    });

    it("sortowanie wyników po dacie", () => {
      cy.KotkowoSearch().type("{enter}");
      cy.get(".gsc-selected-option-container")
        .should("be.visible")
        .click({ force: true });

      cy.get(KurierPoranny[1].menu).should("be.visible");
      cy.get(KurierPoranny[2].drugie_dziecko).click({ force: true });
    });
  });
});

describe("zamknięcie pop-upu gratka.pl", () => {
  beforeEach("akceptacja ciasteczek", () => {
    cy.closePopUpB();
  });
  it("kliknięcie w x", () => {
    cy.get("#graton-close").click();
  });
});

describe("sprawdzenie pogody", () => {
  beforeEach("akceptacja ciasteczek", () => {
    cy.closePopUpB();
  });

  it("sprawdzenie pogody dla Białegostoku", () => {
    cy.get(".atomsNavigationIconsIcon--weather").should("be.visible").click();
    cy.get(".componentsWeatherWeather__weatherCity").should("be.visible");
    cy.url().should("contain", "pogoda");
    cy.get(".componentsNavigationSeoHeader__title").should(
      "have.text",
      "Pogoda w Białymstoku"
    );
  });

  describe("logowanie", () => {
    beforeEach("akceptacja ciasteczek", () => {
      cy.closePopUpB();
    });

    it("poprawne logowanie", () => {
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible").click();
      cy.get("#forum-login-panel")
        .should("be.visible")
        .click()
        .type(KurierPoranny[4].login);

      cy.get("#forum-haslo-panel")
        .should("be.visible")
        .click()
        .type(KurierPoranny[5].haslo);
      cy.get("#forum-przycisk").should("be.visible").click();
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible");
    });

    it("niepoprawne logowanie", () => {
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible").click();
      cy.get("#forum-login-panel")
        .should("be.visible")
        .click()
        .type("hello@wp.pl");
      cy.get("#forum-haslo-panel").should("be.visible").click().type("hello");
      cy.get("#forum-przycisk").should("be.visible").click();
      cy.get(".komunikat > p").should("be.visible");
    });

    it("logowanie bez wpisania danych", () => {
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible").click();
      cy.get("#forum-login-panel").should("be.visible");
      cy.get("#forum-haslo-panel").should("be.visible");
      cy.get("#forum-przycisk").should("be.visible").click();
    });
  });
});
