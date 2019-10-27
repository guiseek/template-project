import { getGreeting } from '../support/app.po';

describe('customer', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to customer!');
  });
});
