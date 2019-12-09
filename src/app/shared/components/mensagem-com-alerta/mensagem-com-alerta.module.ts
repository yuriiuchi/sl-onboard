import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MensagemComAlertaComponent } from './mensagem-com-alerta.component';
import { PoModalModule } from '@portinari/portinari-ui';

@NgModule({
  declarations: [
    MensagemComAlertaComponent
  ],
  entryComponents: [
    MensagemComAlertaComponent
  ],
  imports: [
    CommonModule,
    PoModalModule
  ],
  exports: [
    MensagemComAlertaComponent
  ]
})
export class MensagemComAlertaModule { }
