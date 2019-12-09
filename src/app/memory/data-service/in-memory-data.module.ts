import { HttpBackend, XhrFactory, HttpRequest } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientBackendService, InMemoryBackendConfig, InMemoryDbService } from 'angular-in-memory-web-api';
import { defaultOptions } from './in-memory-data.service';
import { getDbService } from './data-service-mapper';

function getRequestMethod(req: HttpRequest<any>): string {
  if (req.url.endsWith('/alterar') || req.url.endsWith('/editar')) {
    return 'put';
  } else if (req.url.endsWith('/excluir') || req.url.endsWith('/deletar')) {
    return 'delete';
  } else {
    return (req.method || 'get').toLowerCase();
  }
}

// Internal - Creates the in-mem backend for the HttpClient module
// AoT requires factory to be exported
export function httpClientInMemBackendServiceFactory(
  dbService: InMemoryDbService,
  options: InMemoryBackendConfig,
  xhrFactory: XhrFactory,
): HttpBackend {
  const backend: HttpClientBackendService = new HttpClientBackendService(dbService, options, xhrFactory);
  // hack para sobrepor a função de pegar o método do request
  backend['getRequestMethod'] = getRequestMethod.bind(backend);
  return backend;
}

@NgModule({})
export class InMemoryDataModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InMemoryDataModule,
      providers: [
        { provide: InMemoryDbService,  useValue: getDbService() },
        { provide: InMemoryBackendConfig, useValue: defaultOptions },

        { provide: HttpBackend,
          useFactory: httpClientInMemBackendServiceFactory,
          deps: [InMemoryDbService, InMemoryBackendConfig, XhrFactory]}
      ]
    };
  }

  static forFeature(): ModuleWithProviders {
    return InMemoryDataModule.forRoot();
  }
}
