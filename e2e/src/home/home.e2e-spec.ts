import { HomePage } from './home.po';

const homePage = new HomePage();

describe('home.e2e-spec | HomePage', () => {

  beforeEach(async () => {
    await homePage.navigateTo();
  });

  it('Cenário de testes da página inicial', async () => {

    // Deve apresentar a mensagem de boas-vindas para o usuário
    const mensagem = await homePage.getMensagemDeBoasVindas();
    expect(mensagem).toContain('Yuri Iuchi');

    // Deve apresentar o toolbar com as informações do usuário'
    const toolbar = await homePage.getNomeUnidadeToolbar();
    expect(toolbar.nomeCompleto).toEqual('Yuri Iuchi');
    expect(toolbar.nomeUnidade).toEqual('Unidade TOTVS S.A.');
  });
});

