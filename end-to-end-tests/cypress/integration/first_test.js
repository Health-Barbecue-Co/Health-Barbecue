describe('My First Test', function () { 
    it('Connect to the main page', function () {
        const fakestring='cyril9'
        // Go to home page
        cy.visit('http://localhost:5000')
        cy.url()
          .should('equal', 'http://localhost:4000/user')

        // Go to create user
        cy.get('[id="create-user-link"]').click()
        cy.url()
          .should('equal', 'http://localhost:4000/user/register')

        // Create user
        cy.get('[id="firstname-field"]').type(fakestring)
        cy.get('[id="lastname-field"]').type(fakestring)
        cy.get('[id="login-field"]').type(fakestring)
        cy.get('[id="password-field"]').type(fakestring)
        cy.get('[id="save-button"]').click()
        cy.url()
          .should('equal', 'http://localhost:4000/user')

        //
        cy.get('[id="login-field"]').type(fakestring)
        cy.get('[id="password-field"]').type(fakestring)
        cy.get('[id="signin-button"]').click()
        cy.url()
          .should('equal', 'http://localhost:4000/')

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