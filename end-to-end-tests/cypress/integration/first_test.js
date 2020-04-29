describe('My First Test', function () { 
    it('Connect to the main page', function () {
        // Go to home page
        cy.visit('http://localhost:4000')
        cy.get('[id="signin-button"]').click()

        // 
        cy.get('[id="project-icon"]').click()
        cy.url()
          .should('include', '/projects')
          
        // 
        cy.get('[id="algorithm-icon"]').click()
        cy.url()
          .should('include', '/algorithms')
          
        // 
        cy.get('[id="home-icon"]').click()
        cy.url()
          .should('include', '/home')

        // 
        cy.get('[id="series-icon"]').click()
        cy.get('[id="synchronize-pacs-icon"]').click()
        cy.url()
          .should('include', '/series')
    })
})