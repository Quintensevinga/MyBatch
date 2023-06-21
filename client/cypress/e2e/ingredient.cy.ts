describe('ingredients', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders all the content on the page', () => {
    cy.contains('Inventory').click();

    cy.contains('Your Inventory').should('be.visible');

    cy.contains('Hops').should('be.visible');
    cy.contains('Malts').should('be.visible');
    cy.contains('Yeast').should('be.visible');
    cy.contains('Additional Ingredients').should('be.visible');

    cy.get('.hops-dd').should('exist');
    cy.get('.yourmalts').should('exist');
    cy.get('.youryeast').should('exist');
    cy.get('.yourAdditions').should('exist');

    cy.get('input').should('have.length', 4);

    cy.contains('Add').should('be.visible');
  });

  it('should add, save and delete ingredients', () => {
    cy.contains('Inventory').click();

    cy.get('.hops-dd').select('Fuggle');

    cy.get('input').first().type('3');

    cy.contains('Add').click();

    cy.reload();

    cy.contains('Fuggle 3').should('be.visible');

    cy.get('.deleteButton').first().click();

    cy.contains('Fuggle 3').should('not.exist');
  });

  it('should add, save and delete additional', () => {
    cy.contains('Inventory').click();
    cy.get('.find-malts').select('Brown Malt');
    cy.get('input').eq(1).type('a');
    cy.get('.malt-test').click();
    cy.reload();
    cy.contains('Brown Malt').should('be.visible');

    cy.get('.deleteButton').click();

    cy.contains('Brown Malt a').should('not.exist');
  });
  it('should add, save and delete malts', () => {
    cy.contains('Inventory').click();
    cy.get('.additonalIng').select('Ginger Root');
    cy.get('input').eq(3).type('a');
    cy.get('.fortest').click();
    cy.reload();
    cy.contains('Ginger Root').should('be.visible');

    cy.get('[data-testid=delitem]').click();

    cy.contains('Ginger Root a').should('not.exist');
  });
});
