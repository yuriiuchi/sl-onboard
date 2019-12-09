import { BaseMessage, ITextMessage } from 'totvs-log-base-foundation';
import { GlobalService } from 'totvs-log-web-foundation';
import { EventEmitter, Output, Component, ViewChild } from '@angular/core';
import { PoModalComponent, PoModalAction } from '@portinari/portinari-ui';

@Component({
  selector: 'app-mensagem-com-alerta',
  templateUrl: './mensagem-com-alerta.component.html',
  styleUrls: ['./mensagem-com-alerta.component.css']
})
export class MensagemComAlertaComponent {

  /** Evento disparado na confirmação da operação na modal */
  @Output() confirm: EventEmitter<PoModalComponent> = new EventEmitter<PoModalComponent>();

  /** Evento disparado no cancelamento da operação na modal */
  @Output() cancel: EventEmitter<PoModalComponent> = new EventEmitter<PoModalComponent>();

  /** Mensagem que será apresentada */
  private _message: ITextMessage;
  /** Método acessor que retorna a mensagem que deve ser apresentada */
  get message(): ITextMessage {
    return this._message;
  }

  /** Tamanho da janela que será apresentada para o usuário. */
  private _modalSize = 'md';
  /** Método acessor que retorna o tamanho da janela que será apresentada para o usuário */
  get modalSize(): string {
    return this._modalSize;
  }

  /** Variável que indica se o fechamento da modal é controlado manualmente pelo programador */
  private closeManually = false;

  /** Ação primária Confirmar */
  private _primaryAction: PoModalAction;
  get primaryAction(): PoModalAction {
    return this._primaryAction;
  }

  /** Ação secundária Cancelar */
  private _secondaryAction: PoModalAction;
  get secondaryAction(): PoModalAction {
    return this._secondaryAction;
  }

  /** Referência para a modal */
  @ViewChild(PoModalComponent, { static: true }) modal: PoModalComponent;

  constructor(public global: GlobalService) { }

  /**
   * Define a ação secundária para a modal
   */
  private setSecondaryAction(): void {
    this._secondaryAction = {
      label: this.global.i18n.literals['nao'],
      action: () => {
        this.cancel.emit(this.modal);
        if (!this.closeManually) {
          this.modal.close();
        }
      }
    };
  }

  /**
   * Define a ação primária para a modal
   */
  private setPrimaryAction(): void {
    this._primaryAction = {
      label: this.global.i18n.literals['sim'],
      action: () => {
        this.confirm.emit(this.modal);
        if (!this.closeManually) {
          this.modal.close();
        }
      }
    };
  }

  /**
   * Abre a modal com a mensagem
   * @param message Mensagem que pode ser passada com strings ou literais
   * @param closeManually Indicação se o controle do fechamento da modal deve ser manual
   * (programador precisa disparar o comando nos eventos de confirmação/cancelamento)
   */
  public open(
    message: BaseMessage | ITextMessage,
    closeManually = false,
    modalSize = 'md'
  ): void {
    this.setSecondaryAction();
    this.setPrimaryAction();
    this.closeManually = closeManually;
    this._modalSize = modalSize;
    if (message instanceof BaseMessage) {
      this._message = message.messageI18n(this.global.i18n);
    } else {
      this._message = message;
    }
    this.modal.open();
  }
}
