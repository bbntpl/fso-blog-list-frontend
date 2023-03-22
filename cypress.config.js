/*eslint-env node*/

const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		setupNodeEvents() {
			// implement node event listeners here
		},
		baseUrl: 'http://localhost:3000',
		video: false
	},
	env: {
		BACKEND: 'http://localhost:3003/api'
	}
});
