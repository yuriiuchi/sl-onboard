import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from 'totvs-log-web-foundation';
import { MensagemComAlertaComponent } from './../components/mensagem-com-alerta/mensagem-com-alerta.component';

@Injectable()
export class MensagemCarregarTodosService {

  /**
   * Atributo que recebe a instância da dialog criada
   */
  private messageDialogRef = undefined;
  private questionComponent: MensagemComAlertaComponent;

  /**
   * Método construtor da classe
   * @param componentFactoryResolver Parâmetro do serviço que permite adicionar componentes dinamicamente
   * @param appRef Parâmetro que recebe a referência da aplicação Angular.
   * @param injector Parâmetro do serviço de injeção de dependência
   */
  constructor(
    private global: GlobalService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {
  }

  /**
   * Método por exibir uma dialog em tela
   */
  public question(): Observable<boolean> {
    return new Observable<boolean>( (observer) => {
      this.createQuestionComponent();
      const subscriptions = new Subscription();
      subscriptions.add(this.questionComponent.confirm.subscribe(() => {
        subscriptions.unsubscribe();
        observer.next(true);
        observer.complete();
      }));
      subscriptions.add(this.questionComponent.cancel.subscribe(() => {
        subscriptions.unsubscribe();
        observer.next(false);
        observer.complete();
      }));
      this.questionComponent.open({
        titleText: this.global.i18n.literals['todosResultadosTitle'],
        text: this.global.i18n.literals['todosResultadosQuestion'],
        detailText: this.global.i18n.literals['todosResultadosWarning']
      }, false, 'sm');
    });
  }

  /**
   * Método responsável por criar o componente dialog
   */
  private createQuestionComponent(): void {

    if ( this.messageDialogRef === undefined ) {

      this.messageDialogRef = this.componentFactoryResolver
        .resolveComponentFactory(MensagemComAlertaComponent)
        .create(this.injector);

      this.appRef.attachView(this.messageDialogRef.hostView);

      const domElem = (this.messageDialogRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

      document.body.appendChild(domElem);
      this.questionComponent = this.messageDialogRef.instance;
    }
  }
}
