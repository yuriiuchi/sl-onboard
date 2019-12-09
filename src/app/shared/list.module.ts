import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageDynamicSearchModule } from '@portinari/portinari-templates';
import { PoButtonModule, PoPageModule, PoPopupModule, PoTooltipModule } from '@portinari/portinari-ui';
import { DefaultDateViewConverterService } from 'totvs-log-base-foundation';
import { FndKendoGridModule } from 'totvs-log-web-foundation/src/kendo-grid';
import { InMemoryDataModule } from './../memory/data-service/in-memory-data.module';
import { MensagemComAlertaModule } from './components/mensagem-com-alerta/mensagem-com-alerta.module';
import { DisclaimerGroupHelperService } from './services/disclaimer-group-helper.service';
import { MensagemCarregarTodosService } from './services/mensagem-carregar-todos.service';

@NgModule({
  declarations: [],
  imports: [
    InMemoryDataModule.forFeature()
  ],
  exports: [
    CommonModule,
    PoPageModule,
    PoButtonModule,
    PoPopupModule,
    PoPageDynamicSearchModule,
    MensagemComAlertaModule,
    PoPageDynamicSearchModule,
    PoTooltipModule,
    FndKendoGridModule
  ],
  providers: [
    DefaultDateViewConverterService,
    DisclaimerGroupHelperService,
    MensagemCarregarTodosService
  ]
})
export class ListModule { }
