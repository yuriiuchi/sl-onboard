import { HomePage } from './home.po';

const homePage = new HomePage();

describe('home.e2e-spec | HomePage', () => {

  beforeEach(async () => {
    await homePage.navigateTo();
  });

  it('Cenário de testes da página inicial', async () => {

    // Deve apresentar a mensagem de boas-vindas para o usuário
    const mensagem = await homePage.getMensagemDeBoasVindas();
    expect(mensagem).toContain('José Antônio');

    // Deve apresentar o toolbar com as informações do usuário'
    const toolbar = await homePage.getNomeUnidadeToolbar();
    expect(toolbar.nomeCompleto).toEqual('José Antônio');
    expect(toolbar.nomeUnidade).toEqual('Unidade TOTVS S.A.');
  });
});

