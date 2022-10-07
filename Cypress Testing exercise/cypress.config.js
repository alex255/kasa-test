const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  watchForFileChanges: false,
  video: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    embeddedScreenshots: true,
    quite: true,
  },
  env: {
    grepOmitFiltered: true,
  },
  e2e: {
    specPattern: 'cypress/e2e/**',
    supportFile: 'cypress/support/e2e.js',
    async setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        await afterRunHook();
      });
    },
  },
});
