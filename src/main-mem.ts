import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { createDatabase } from './app/memory/data-service/data-service-mapper';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

declare const require: any;

// Then we find all the mocks.
const context = require.context('../e2e/src/', true, /\.data\.ts$/);
// And load the modules.
context.keys().map(context);

createDatabase()
  .then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .then(() => {
        console.log('Aplicação com database in-memory started!');
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
