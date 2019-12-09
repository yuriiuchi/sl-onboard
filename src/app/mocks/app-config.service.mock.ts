import { Unidade } from './../entidades/unidade.entity';
import { EventEmitter } from '@angular/core';
import { IAppConfig } from './../entidades/app-config.interface';

export class AppConfigServiceMock {

  public static idiomasSuportados = [
    { language: 'pt-br' },
    { language: 'en-US' },
    { language: 'es' }
  ];

  private unidadeCorrente: Unidade = Unidade.vazio();

  private readonly _eventoUnidadeAlterada: EventEmitter<Unidade> = new EventEmitter();
  public get eventoUnidadeAlterada(): EventEmitter<Unidade> {
    return this._eventoUnidadeAlterada;
  }

  private readonly _eventoIdiomaAlterado: EventEmitter<string> = new EventEmitter<string>();
  public get eventoIdiomaAlterado(): EventEmitter<string> {
    return this._eventoIdiomaAlterado;
  }

  private _apresentarMenu = true;
  get apresentarMenu(): boolean {
    return this._apresentarMenu;
  }

  private readonly _eventoApresentarMenu: EventEmitter<boolean> = new EventEmitter();
  public get eventoApresentarMenu(): EventEmitter<boolean> {
    return this._eventoApresentarMenu;
  }

  public get configuracoes(): IAppConfig {
    return {
      urlAutoridadeRAC: 'http://rac.totvs.com.br/totvs.rac',
      idClienteRAC: 'wms',
      urlWMS: {
        unidade: 'http://backend.totvs.com.br/unidade',
        unidadeQuery: 'http://backend.totvs.com.br/unidadeQuery',
        endereco: 'http://backend.totvs.com.br/endereco',
        documento: 'http://backend.totvs.com.br/documento',
        documentoQuery: 'http://backend.totvs.com.br/documentoQuery',
        recebimento: 'http://backend.totvs.com.br/recebimento',
        recebimentoQuery: 'http://backend.totvs.com.br/recebimentoQuery',
        estoque: 'http://backend.totvs.com.br/estoque',
        estoqueQuery: 'http://backend.totvs.com.br/estoqueQuery',
        expedicao: 'http://backend.totvs.com.br/expedicao',
        expedicaoQuery: 'http://backend.totvs.com.br/expedicaoQuery',
        selecaoEstoque: 'http://backend.totvs.com.br/selecaoEstoque',
        separacao: 'http://backend.totvs.com.br/separacao',
        conferenciaExp: 'http://backend.totvs.com.br/conferenciaExp'
      }
    };
  }

  constructor() { }

  dispararEventoIdiomaAlterado(novoIdioma: string) {
    this._eventoIdiomaAlterado.emit(novoIdioma);
  }

  dispararEventoUnidadeAlterada(novaUnidade: Unidade) {
    this.unidadeCorrente = novaUnidade;
    this._eventoUnidadeAlterada.emit(this.unidadeCorrente);
  }

  dispararEventoApresentarMenu(deveApresentar: boolean) {
    this._apresentarMenu = false;
    this._eventoApresentarMenu.emit(deveApresentar);
  }

  getUnidadeAtual(): Unidade {
    return this.unidadeCorrente;
  }

  getUnidadeId(): string {
    return this.unidadeCorrente.id || 'c73e6dc9-5de8-4a31-9207-00f734340e78';
  }
}
