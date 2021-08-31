// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("dash", () => {
  cy.visit('/dashboard')
})

Cypress.Commands.add("addContact", (contact) => {
  cy.get('[data-testid="add_contact_button"]').click();

  if (contact.name) cy.get('[data-testid="form_name"]').type(contact.name);
  if (contact.number)
    cy.get('[data-testid="form_number"]').type(contact.number);
  if (contact.description)
    cy.get('[data-testid="form_description"]').type(contact.description);

  cy.get('[data-testId="form_btn_cadastrar"]').click();
});

Cypress.Commands.add("searchContact", (number) => {
  cy.get('.level-right input').type(number)
  cy.get('.level-right button.is-primary').click()
});

Cypress.Commands.add("contactItem", () => {
  return cy.get('.card');
});


Cypress.Commands.add("contactCard", () => {
  return cy.get('[data-testid="contact_card"]');
});

Cypress.Commands.add("cardName", (contact) => {
  return cy.get(`[data-testid="contact_card_name_${contact}"]`);
});

Cypress.Commands.add("cardNumber", (contact) => {
  return cy.get(`[data-testid="contact_card_number_${contact}"]`);
});

Cypress.Commands.add("cardDescription", (contact) => {
  return cy.get(`[data-testid="contact_card_description_${contact}"]`);
});

Cypress.Commands.add("cardWasAdded", (contact) => {
  cy.get('[data-testid="contact_card"]');
  cy.get(`[data-testid="contact_card_name_${contact.name}"]`).should(
    "have.text",
    contact.name
  );
  cy.get(`[data-testid="contact_card_number_${contact.number}"]`).should(
    "have.text",
    contact.number
  );
  cy.get(
    `[data-testid="contact_card_description_${contact.description}"]`
  ).contains(contact.description);
});

Cypress.Commands.add("getContact", (target) => {
  return cy.contains('.card', target);
});

Cypress.Commands.add("removeContact", (target) => {
  cy.getContact(target).find('.btn-remove').click()
})

Cypress.Commands.add("nameErrorNotification", () => {
  return cy.get('[data-testId="name_error"]');
});

Cypress.Commands.add("numberErrorNotification", () => {
  return cy.get('[data-testId="number_error"]');
});

Cypress.Commands.add("descriptionErrorNotification", () => {
  return cy.get('[data-testId="description_error"]');
});
