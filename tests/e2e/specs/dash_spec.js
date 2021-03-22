// https://docs.cypress.io/api/introduction/api.html

describe("Dashboard", () => {
  describe("Quando acesso o dashboard", () => {
    before(() => {
      cy.visit("/dashboard");
      cy.contains("h1", "Seu Gerenciador de Contatos");
    });

    it("Então deve ver a lista de contatos", () => {
      cy.get('.card').then(elements => {
        expect(elements.length > 0).to.be.true
      })
    });
  });
});
