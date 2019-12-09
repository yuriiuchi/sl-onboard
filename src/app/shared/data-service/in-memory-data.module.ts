import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({})
export class InMemoryDataModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: InMemoryDataModule,
      providers: []
    };
  }

  static forFeature(): ModuleWithProviders {
    return InMemoryDataModule.forRoot();
  }
}
