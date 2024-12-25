describe('Тестирование работы модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('backBaseUrl')}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredientsApi');
    cy.visit(Cypress.env('frontBaseUrl') as string);
    cy.wait('@getIngredientsApi', { requestTimeout: 10000 });
  });

  it('Тестирование открытия модального окна описания объекта и его закрытие по кнопке', () => {
    cy.get('[data-testid="burger-ingredient"]').first().click();
    cy.get('[data-cy="modal-container"]').should('be.visible');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal-container"]').should('not.exist');
  });

  it('Тестирование открытия модального окна описания объекта и его закрытие по оверлею', () => {
    cy.get('[data-testid="burger-ingredient"]').first().click();
    cy.get('[data-cy="modal-container"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal-container"]').should('not.exist');
  });

  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
