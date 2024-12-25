describe('Тестирование процесса создания заказа', () => {
  const bun = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i'
  };

  const main = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии'
  };

  const sauce = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X'
  };

  const orderNumber = 64002;
  const mockAccessToken = 'MOCK_ACCESS_TOKEN';

  before(() => {
    cy.setCookie('accessToken', mockAccessToken);
    cy.intercept('GET', `${Cypress.env('backBaseUrl')}/auth/user`, {
      fixture: 'get-user.json'
    }).as('getUser');

    cy.intercept('GET', `${Cypress.env('backBaseUrl')}/ingredients`, {
      fixture: 'ingredients.json'
    }).as('getIngredientsApi');

    cy.visit(Cypress.env('frontBaseUrl') as string);

    cy.wait('@getUser', { requestTimeout: 10000 });
    cy.wait('@getIngredientsApi', { requestTimeout: 10000 });
  });

  it('Добавляем ингридиенты и оформляем заказ', () => {
    cy.get(`[data-cy="${bun._id}"]`).contains('button', 'Добавить').click();
    cy.get(`[data-cy="${main._id}"]`).contains('button', 'Добавить').click();
    cy.get(`[data-cy="${sauce._id}"]`).contains('button', 'Добавить').click();

    cy.fixture('create-order.json').then((mockResponse) => {
      cy.intercept('POST', `${Cypress.env('backBaseUrl')}/orders`, (req) => {
        expect(req.headers).to.have.property('authorization');
        expect(req.headers.authorization).to.equal(mockAccessToken);

        req.reply({
          statusCode: 200,
          body: mockResponse
        });
      }).as('createOrderApi');
    });

    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@createOrderApi');

    cy.get('[data-cy="modal-container"]').should('be.visible');
    cy.should('contain', orderNumber);

    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal-container"]').should('not.exist');

    cy.get('[data-cy="burger_constructor"]')
      .children()
      .should('have.length', 4);
  });

  after(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
