describe('Busca', () => {


    const contact = {
        name: "Mike Portnoy",
        number: "2198745698",
        description: "Aulas de Bateria"
    }

    describe(`Quando busco pelo contato ${contact.name}`, () => {

        before(() => {
            cy.request({
                method: "POST",
                url: "http://localhost:3000/contacts",
                headers: { 'Content-Type': 'application/json' },
                body: contact,
                failOnStatusCode: false
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
            })
        })

        it('Quando faço a busca desse contato', () => {
            cy.dash()
            cy.searchContact(contact.number)
        })

        it('Devo ver somente esse contato na dashboard', () => {
            cy.contactItem().should('have.length', 1)
            cy.contactItem().contains(contact.name)
            cy.contactItem().contains(contact.description)
        })
    })

    context('Quando busco por um contato não cadastrado', () => {
        before(() => {
            cy.dash()
            cy.searchContact(18555555555)
        })

        it('Deve retornar uma mensagem de alerta', () => {
            cy.get('.notification').contains('Contato não cadastrado :(')
        })
    })

})
