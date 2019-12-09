// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './../e2e/src/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      args: [ 'lang=pt-BR', '--headless', '--disable-gpu', '--no-sandbox'],
      prefs: {
        intl: { accept_languages: 'pt-BR' },
      },
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './../e2e/tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    var junitReporter = new JUnitXmlReporter({
      savePath: require('path').join(__dirname, './../e2e/junit'),
      consolidateAll: true
    });
    jasmine.getEnv().addReporter(junitReporter);

    const { browser } = require('protractor');
    // Função para adicionar os itens na memória do browser
    global['addCollectionItems'] = function (collectionName, data) {
      return browser.executeAsyncScript(function (collectionName, data, callback) {
        const dbService = window['inMemoryDataService'];
        data.forEach( (item, index) => {
          dbService.storeData(collectionName, item).then(() => {
            if (index == (data.length - 1)) {
              callback(true);
            }
          });
        });
      }, collectionName, data);
    };

    // Função para remover os itens na memória do browser
    global['clearCollectionItems'] = function (collectionName) {
      return browser.executeAsyncScript(function (collectionName, callback) {
        const dbService = window['inMemoryDataService'];
        dbService.clearData(collectionName).then(() => {
          callback(true);
        });
      }, collectionName);
    };

    // Função para remover os itens na memória do browser
    global['addResponseInterceptor'] = function (interceptor) {
      return browser.executeScript(function (interceptor) {
        const dbService = window['inMemoryDataService'];
        dbService.addRequestInterceptorByValue(interceptor);
      }, interceptor);
    };

  },
  SELENIUM_PROMISE_MANAGER: false
};
