describe('Тестирование конструктора', () => {
  const bun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i'
  };

  const main = {
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью'
  };

  const sauce = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X'
  };

  before(() => {
    cy.intercept('GET', `${Cypress.env('backBaseUrl')}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredientsApi');
    cy.visit(Cypress.env('frontBaseUrl') as string);
    cy.wait('@getIngredientsApi', { requestTimeout: 10000 });
  });

  it('Добавление ингридиентов', () => {
    cy.get(`[data-cy="${bun._id}"]`).contains('button', 'Добавить').click();
    cy.get(`[data-cy="${main._id}"]`).contains('button', 'Добавить').click();
    cy.get(`[data-cy="${sauce._id}"]`).contains('button', 'Добавить').click();

    cy.get('[data-cy="buns_top"]').should('contain', bun.name);
    cy.get('[data-cy="buns_bottom"]').should('contain', bun.name);
    cy.get('[data-cy="ingredients"]').should('contain', main.name);
    cy.get('[data-cy="ingredients"]').should('contain', sauce.name);
  });

  after(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
