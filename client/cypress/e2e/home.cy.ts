describe('home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('the h1 contains the correct text', () => {
    cy.get('h1').should('exist').contains('Welcome to MyBatch Home Page');
  });

  it('the nav links on homepage are correct', () => {
    cy.get('a').eq(0).contains('MyBatch');
    cy.get('a').eq(1).contains('Inventory');
    cy.get('a').eq(2).contains('Our recipes');
    cy.get('a').eq(3).contains('My recipes');
  });

  it('able to render text and links on homepage', () => {
    cy.findByText(
      /seamlessly browse through a diverse range of hops, malts, yeasts, and more, and effortlessly add them to your inventory for easy tracking\. mybatch ensures you never run out of essential ingredients\./i
    );
    cy.findByRole('link', {
      name: /our recipes/i,
    });
    cy.get('link').then((link) => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });

    cy.get('link').eq(1).should('have.css', 'display', 'none').invoke('show');
    cy.contains('Inventory').click();
    cy.location('pathname').should('eq', '/inventory');
  });
});
