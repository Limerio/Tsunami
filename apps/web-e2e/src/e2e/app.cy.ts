import { getGreeting } from '../support/app.po'

describe('web-2', () => {
  beforeEach(() => cy.visit('/'))

  it('should display welcome message', () => {
    cy.login('my-email@something.com', 'myPassword')

    getGreeting().contains('Welcome to Astro')
  })
})
