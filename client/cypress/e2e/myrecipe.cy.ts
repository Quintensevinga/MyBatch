describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('render the content on the page', () => {
    cy.contains('My recipes').click();

    cy.contains('Release creativity, create your own recipe').should('be.visible');

    cy.contains('Name').should('be.visible');

    cy.contains('Beer Style').should('be.visible');

    cy.contains('Add Your Instructions here').should('be.visible');

    cy.contains('Details').should('be.visible');

    cy.contains('Ingredients').should('be.visible');

    cy.contains('Hops').should('be.visible');
    cy.contains('Malts').should('be.visible');
    cy.contains('Yeast').should('be.visible');

    cy.contains('Qty').should('be.visible');

    cy.contains('Your recipe list').should('be.visible');
  });

  it('should be able to add recipes', () => {
    cy.contains('My recipes').click();
    // cy.get('[data-testid=delitem]').click();
    cy.get('[data-testid=recipe-name]').type('pale ale');

    cy.get('[data-testid=beer-style]').type('ale');

    cy.get('[data-testid=text-area]').type('this is how to make the beer');

    cy.get('[data-testid=select-hops]').select('Cascade');

    cy.get('[data-testid=hops-qty]').type('3');

    cy.get('[data-testid=select-malts]').select('Pale Malt');

    cy.get('[data-testid=malts-qty]').type('3');

    cy.get('[data-testid=select-yeasts]').select('English Ale');

    cy.get('[data-testid=yeast-qty]').type('3');
    cy.get('[data-testid=create-recipe').click();
    cy.get('.your-list-li').last().click();
    cy.get('[data-testid=delete-recipe').last().click();
    cy.reload();
  });
});
