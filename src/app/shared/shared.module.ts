import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DefaultDateViewConverterService } from 'totvs-log-base-foundation';
import { AuthModule, FndModule } from 'totvs-log-web-foundation';
import { MensagemComAlertaModule } from './components/mensagem-com-alerta/mensagem-com-alerta.module';
import { FormModule } from './form.module';
import { ListModule } from './list.module';
import { PageModule } from './page.module';
import { DisclaimerGroupHelperService } from './services/disclaimer-group-helper.service';
import { InMemoryDataModule } from '../memory/data-service/in-memory-data.module';
import { MensagemCarregarTodosService } from './services/mensagem-carregar-todos.service';

@NgModule({
  imports: [
    InMemoryDataModule.forFeature()
  ],
  exports: [
    CommonModule,
    FndModule,
    AuthModule,
    PageModule,
    ListModule,
    FormModule,
    MensagemComAlertaModule
  ],
  providers: [
    DefaultDateViewConverterService,
    DisclaimerGroupHelperService,
    MensagemCarregarTodosService
  ]
})
export class SharedModule { }
