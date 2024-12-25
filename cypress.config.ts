import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      frontBaseUrl: 'localhost:4000',
      backBaseUrl: 'https://norma.nomoreparties.space/api'
    }
  }
});
