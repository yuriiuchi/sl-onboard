import { EnderecoArmazenagem } from './endereco-armazenagem.entity';
import { EnderecoCoordenada } from './endereco-coordenada.entity';
import { DadosCoordenadaBlocoRua } from './dados-coordenada-bloco-rua.entity';
import { EstruturaFisicaConfiguracao } from './../../entidades/estrutura-fisica-configuracao.entity';
import { DadosCoordenadaColuna } from './dados-coordenada-coluna.entity';
import { EstruturaFisicaConfiguracaoColuna } from './../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { DadosCoordenadaApartamento } from './dados-coordenada-apartamento.entity';
import { DadosCoordenadaAndar } from './dados-coordenada-andar.entity';
import { EnderecoArmazenagemCoordenadas } from './endereco-armazenagem-coordenadas.entity';
import { EnderecoCoordenadaAndar } from './endereco-coordenada-andar.entity';
import { Endereco } from './endereco.entity';
import { TipoNumeracaoColunaEnum } from './../../entidades/tipo-numeracao-coluna.enum';

describe('endereco-armazenagem.entity.spec | EnderecoArmazenagem', () => {
  let instance: EnderecoArmazenagem;

  const configuracao: EstruturaFisicaConfiguracao = {
    ativo: true,
    label: 'Teste',
    descricaoPadrao: 'Teste',
    descricao: '',
    descricaoMobilePadrao: 'Teste',
    descricaoMobile: '',
    descricaoApresentacao: '',
    descricaoMobileApresentacao: '',
    descricaoCompletaApresentacao: ''
  };

  const configuracaoTesteColuna: EstruturaFisicaConfiguracaoColuna = {
    ativo: true,
    label: 'bloco',
    descricaoPadrao: 'Bloco',
    descricao: '',
    descricaoMobilePadrao: 'Bloco',
    descricaoMobile: '',
    descricaoApresentacao: '',
    descricaoMobileApresentacao: '',
    descricaoCompletaApresentacao: '',
    configuracaoLados: {
      ladoDireito: {
        prefixo: 'D',
        tipoNumeracaoColuna: null
      },
      ladoEsquerdo: {
        prefixo: 'E',
        tipoNumeracaoColuna: null
      }
    },
    tipoLadoDireito: '',
    tipoLadoEsquerdo: '',
    prefixoLadoDireito: 'D',
    prefixoLadoEsquerdo: 'E'
  };

  const configuracaoTesteColunasSemLado: EstruturaFisicaConfiguracaoColuna = {
    ativo: true,
    label: 'bloco',
    descricaoPadrao: 'Bloco',
    descricao: '',
    descricaoMobilePadrao: 'Bloco',
    descricaoMobile: '',
    descricaoApresentacao: '',
    descricaoMobileApresentacao: '',
    descricaoCompletaApresentacao: '',
    configuracaoLados: null,
    tipoLadoDireito: '',
    tipoLadoEsquerdo: '',
    prefixoLadoDireito: 'D',
    prefixoLadoEsquerdo: 'E'
  };

  const configuracaoTesteColunaParImpar: EstruturaFisicaConfiguracaoColuna = {
    ativo: true,
    label: 'bloco',
    descricaoPadrao: 'Bloco',
    descricao: '',
    descricaoMobilePadrao: 'Bloco',
    descricaoMobile: '',
    descricaoApresentacao: '',
    descricaoMobileApresentacao: '',
    descricaoCompletaApresentacao: '',
    configuracaoLados: {
      ladoDireito: {
        prefixo: null,
        tipoNumeracaoColuna: TipoNumeracaoColunaEnum.PAR()
      },
      ladoEsquerdo: {
        prefixo: null,
        tipoNumeracaoColuna: TipoNumeracaoColunaEnum.IMPAR()
      }
    },
    tipoLadoDireito: 'PAR',
    tipoLadoEsquerdo: 'IMPAR',
    prefixoLadoDireito: null,
    prefixoLadoEsquerdo: null
  };

  beforeEach(() => { instance = new EnderecoArmazenagem(); });

  it('Calcula bloco-rua com números', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const resultado = [{ valor: '1', prefixo: 'A' }, { valor: '2', prefixo: 'A' }];
    const enderecos = new DadosCoordenadaBlocoRua('1', '2', configuracao, 'A');

    coordenadas = instance.calculaBlocosRuas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula valores vazios', () => {

    const coordenadas = [];
    const resultado = [];

    const enderecosBlocoRua = new DadosCoordenadaBlocoRua('A', 'AB', configuracao, 'A');
    const enderecosBlocoRuaAlfa = new DadosCoordenadaBlocoRua('', '', configuracao, 'A');
    const enderecosColuna = new DadosCoordenadaColuna('', '', configuracaoTesteColuna, false, false);
    const enderecosAndar = new DadosCoordenadaAndar(null, null, configuracao);
    const enderecosApartamento = new DadosCoordenadaApartamento('', '', configuracao);

    coordenadas.push(instance.calculaBlocosRuas(enderecosBlocoRua));
    coordenadas.push(instance.calculaAndares(enderecosAndar));
    coordenadas.push(instance.calculaApartamentos(enderecosApartamento));
    coordenadas.push(instance.calculaColunas(enderecosColuna));
    coordenadas.push(instance.calculaBlocosRuas(enderecosBlocoRuaAlfa));

    expect(JSON.stringify(coordenadas[0])).toEqual(JSON.stringify(resultado));
    expect(JSON.stringify(coordenadas[1])).toEqual(JSON.stringify(resultado));
    expect(JSON.stringify(coordenadas[2])).toEqual(JSON.stringify(resultado));
    expect(JSON.stringify(coordenadas[3])).toEqual(JSON.stringify(resultado));
    expect(JSON.stringify(coordenadas[4])).toEqual(JSON.stringify(resultado));

  });

  it('Calcula bloco-rua com letras', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaBlocoRua('AA', 'BB', configuracao, 'TESTE');

    const resultado = [{ valor: 'AA', prefixo: 'TESTE' },
    { valor: 'AB', prefixo: 'TESTE' },
    { valor: 'BA', prefixo: 'TESTE' },
    { valor: 'BB', prefixo: 'TESTE' }];

    coordenadas = instance.calculaBlocosRuas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula bloco-rua com letras com máximo de 1000 COORDENADAS', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaBlocoRua('AAA', 'ZZZ', configuracao, 'TESTE');

    coordenadas = instance.calculaBlocosRuas(enderecos);

    expect(coordenadas.length).toBe(EnderecoArmazenagem.MAXIMO_COORDENADAS);

  });

  it('Calcula bloco-rua com letras iguais se numeros iguais', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    let enderecos = new DadosCoordenadaBlocoRua('AA', 'AA', configuracao, undefined);
    let resultado = [{ valor: 'AA' }];

    coordenadas = instance.calculaBlocosRuas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

    enderecos = new DadosCoordenadaBlocoRua('1', '1', configuracao, undefined);
    resultado = [{ valor: '1' }];

    coordenadas = instance.calculaBlocosRuas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula coluna com prefixo', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaColuna('1', '2', configuracaoTesteColuna, true, true);

    const resultado = [{ valor: '1', prefixo: 'D', orientacao: 'LADO_DIREITO' },
    { valor: '1', prefixo: 'E', orientacao: 'LADO_ESQUERDO' },
    { valor: '2', prefixo: 'D', orientacao: 'LADO_DIREITO' },
    { valor: '2', prefixo: 'E', orientacao: 'LADO_ESQUERDO' }];

    coordenadas = instance.calculaColunas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula coluna com no máximo 1000 coordenadas', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaColuna('1', '5000', configuracaoTesteColuna, true, true);

    coordenadas = instance.calculaColunas(enderecos);

    expect(coordenadas.length).toBe(EnderecoArmazenagem.MAXIMO_COORDENADAS);

  });

  it('Calcula coluna com PAR/IMPAR mas só selecionado o IMPAR', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaColuna('1', '2', configuracaoTesteColunaParImpar, true, false);

    const resultado = [{valor: '1', orientacao: 'LADO_ESQUERDO'}];

    coordenadas = instance.calculaColunas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula coluna com PAR/IMPAR mas só selecionado o PAR', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaColuna('1', '2', configuracaoTesteColunaParImpar, false, true);

    const resultado = [{valor: '2', orientacao: 'LADO_DIREITO'}];

    coordenadas = instance.calculaColunas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula coluna sem configuração lado', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaColuna('1', '4', configuracaoTesteColunasSemLado, false, false);
    const resultado = [{ valor: '1' }, { valor: '2' }, { valor: '3' }, { valor: '4' }];

    coordenadas = instance.calculaColunas(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula apartamento', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaApartamento('1', '4', configuracao);
    const resultado = [{ valor: '1' }, { valor: '2' }, { valor: '3' }, { valor: '4' }];

    coordenadas = instance.calculaApartamentos(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula andares com acessiveis a mão', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaAndar(1, 4, configuracao, ['1', '2']);

    const resultado = [{ valor: '1', acessivelAMao: true }, { valor: '2', acessivelAMao: true },
    { valor: '3', acessivelAMao: false }, { valor: '4', acessivelAMao: false }];

    coordenadas = instance.calculaAndares(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Calcula andares sem acessiveis a mão', () => {

    let coordenadas: Array<EnderecoCoordenada>;
    const enderecos = new DadosCoordenadaAndar(1, 4, configuracao);

    const resultado = [{ valor: '1' }, { valor: '2' },
    { valor: '3' }, { valor: '4' }];

    coordenadas = instance.calculaAndares(enderecos);

    expect(JSON.stringify(coordenadas)).toEqual(JSON.stringify(resultado));

  });

  it('Gerar endereços', () => {

    let coordenadasFim: Endereco[];
    const coordenadas = new EnderecoArmazenagemCoordenadas();

    coordenadas.andar = [EnderecoCoordenadaAndar.acessivelAMao('1'), EnderecoCoordenadaAndar.naoAcessivelAMao('2'),
    EnderecoCoordenadaAndar.acessivelAMao('3')];
    coordenadas.apartamento = [EnderecoCoordenada.semPrefixo('1')];

    coordenadasFim = instance.gerarEnderecos(coordenadas);

    const resultado = [{
      funcao: 'ARMAZENAGEM',
      andar: { valor: '1', acessivelAMao: true },
      apartamento: { valor: '1' }
    },
    {
      funcao: 'ARMAZENAGEM',
      andar: { valor: '2', acessivelAMao: false },
      apartamento: { valor: '1' }
    },
    {
      funcao: 'ARMAZENAGEM',
      andar: { valor: '3', acessivelAMao: true },
      apartamento: { valor: '1' }
    }];

    expect(JSON.stringify(coordenadasFim)).toEqual(JSON.stringify(resultado));

  });

});
