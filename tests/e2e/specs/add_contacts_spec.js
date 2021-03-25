describe("Cadastro de Contatos", () => {
  describe("Novo Contato", () => {
    describe("Quando submeto cadastro completo", () => {
      let contact = {
        name: `Rafael Fernandes ${Date.now()}`,
        number: `19999999999 - ${Date.now()}`,
        description: `Solicitar orçamento consultoria em QA - ${Date.now()}`,
      };

      before(() => {
        cy.visit("/dashboard");
        cy.addContact(contact);
      });

      it("Deve cadastrar esse contato", () => {
        cy.cardWasAdded(contact);
      });
    });

    describe("Quando submeto cadastro sem o nome", () => {
      let contact = {
        name: "",
        number: `19999999999 - ${Date.now()}`,
        description: `Solicitar orçamento consultoria em QA - ${Date.now()}`,
      };

      before(() => {
        cy.visit("/dashboard");
        cy.addContact(contact);
      });

      it("Deve mostra uma notificação", () => {
        cy.nameErrorNotification().should("have.text", "Nome é Obrigatório");
      });
    });

    describe("Quando submeto cadastro sem o number", () => {
      let contact = {
        name: `Rafael Fernandes ${Date.now()}`,
        number: ``,
        description: `Solicitar orçamento consultoria em QA - ${Date.now()}`,
      };

      before(() => {
        cy.visit("/dashboard");
        cy.addContact(contact);
      });

      it("Deve mostra uma notificação", () => {
        cy.numberErrorNotification().should(
          "have.text",
          "Number é Obrigatório"
        );
      });
    });

    describe("Quando submeto cadastro sem a descrição", () => {
      let contact = {
        name: `Rafael Fernandes ${Date.now()}`,
        number: `19999999999 - ${Date.now()}`,
        description: "",
      };

      before(() => {
        cy.visit("/dashboard");
        cy.addContact(contact);
      });

      it("Deve mostra uma notificação", () => {
        cy.descriptionErrorNotification().should(
          "have.text",
          "Assunto é Obrigatório"
        );
      });
    });
  });
});
