import { browser } from 'protractor';
import { $ } from 'protractor';

export class HomePage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}home`) as Promise<any>;
  }

  async getMensagemDeBoasVindas(): Promise<string> {
    return $('.po-page-header-title').getText() as Promise<string>;
  }

  async getNomeUnidadeToolbar(): Promise<{ nomeCompleto: string, nomeUnidade: string }> {
    await this.clicarNoToolbar();
    const titulo = await $('.po-toolbar-profile-item-header-title').getText();
    const subtitulo = await $('.po-toolbar-profile-item-header-subtitle').getText();

    return {
      nomeCompleto: titulo,
      nomeUnidade: subtitulo
    };

  }

  async clicarNoToolbar(): Promise<void> {
    return $('po-toolbar-profile div').click() as Promise<void>;
  }

}
