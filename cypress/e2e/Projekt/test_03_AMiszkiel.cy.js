/// <reference types="cypress" />

import poranny from "../../fixtures/poranny.json";
import commands from "../../support/commands.js";

beforeEach("setup", () => {
  cy.visit("/");
  cy.url().should("contain", "poranny");
});

describe("Testy automatyczne dla strony www.poranny.pl", () => {
  describe("zamknięcie pop-upu gratka.pl", () => {
    beforeEach("akceptacja ciasteczek", () => {
      cy.closePopUpB();
    });

    //test case 8
    it("kliknięcie w x", () => {
      cy.get("#graton-close").click();
    });
  });

  describe("sprawdzenie pogody", () => {
    beforeEach("akceptacja ciasteczek", () => {
      cy.closePopUpB();
    });

    //test case 9
    it("sprawdzenie pogody dla Białegostoku", () => {
      cy.get(".atomsNavigationIconsIcon--weather").should("be.visible").click();
      cy.get(".componentsWeatherWeather__weatherCity").should("be.visible");
      cy.url().should("contain", "pogoda");
      cy.get(".componentsNavigationSeoHeader__title").should(
        "have.text",
        "Pogoda w Białymstoku"
      );
    });
  });

  describe("logowanie", () => {
    beforeEach("akceptacja ciasteczek", () => {
      cy.closePopUpB();
    });

    //test case 10
    it("poprawne logowanie", () => {
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible").click();
      cy.get("#forum-login-panel")
        .should("be.visible")
        .click()
        .type(poranny[4].login);
      cy.get("#forum-haslo-panel")
        .should("be.visible")
        .click()
        .type(poranny[5].haslo);
      cy.get("#forum-przycisk").should("be.visible").click();
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible");
    });

    //test case 11
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

    //test case 12
    it("logowanie bez wpisania danych", () => {
      cy.get(".atomsNavigationIconsIcon--login").should("be.visible").click();
      cy.get("#forum-login-panel").should("be.visible");
      cy.get("#forum-haslo-panel").should("be.visible");
      cy.get("#forum-przycisk").should("be.visible").click();
    });
  });
});
