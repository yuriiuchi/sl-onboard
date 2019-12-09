import { EstruturaFisicaConfiguracoes } from '../../../../entidades/estrutura-fisica-configuracoes.entity';
import { EstruturaFisicaConfiguracaoColuna } from '../../../../entidades/estrutura-fisica-configuracao-coluna.entity';
import { EstruturaFisicaConfiguracao } from '../../../../entidades/estrutura-fisica-configuracao.entity';
import { EstruturaFisicaConfiguracaoColunaForm } from './estrutura-fisica-configuracao-coluna.form';
import { EstruturaFisicaEditarForm } from './estrutura-fisica-editar.form';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';

describe('estrutura-fisica-editar-form.spec | EstruturaFisicaEditarForm', () => {

  let formBuilder: FormBuilder;
  let estruturaFisicaEditarForm: EstruturaFisicaEditarForm;

  const configuracaoBloco: EstruturaFisicaConfiguracao = new EstruturaFisicaConfiguracao('bloco', {
    ativo: false,
    descricaoPadrao: 'Bloco',
    descricao: '',
    descricaoMobilePadrao: 'B',
    descricaoMobile: '',
  });

  const configuracaoRua: EstruturaFisicaConfiguracao = new EstruturaFisicaConfiguracao('rua', {
    ativo: true,
    descricaoPadrao: 'Rua',
    descricao: 'Corredor',
    descricaoMobilePadrao: 'R',
    descricaoMobile: 'C',
  });

  const configuracaoColuna: EstruturaFisicaConfiguracaoColuna = new EstruturaFisicaConfiguracaoColuna('coluna', {
    ativo: false,
    descricaoPadrao: 'Coluna',
    descricao: '',
    descricaoMobilePadrao: 'C',
    descricaoMobile: ''
  });

  const configuracaoColunaParImpar: EstruturaFisicaConfiguracaoColuna = new EstruturaFisicaConfiguracaoColuna('coluna', {
    ativo: true,
    descricaoPadrao: 'Coluna',
    descricao: '',
    descricaoMobilePadrao: 'C',
    descricaoMobile: '',
    ladoDireito: {
      prefixo: '',
      tipoNumeracaoColuna: 'PAR'
    },
    ladoEsquerdo: {
      prefixo: '',
      tipoNumeracaoColuna: 'IMPAR'
    }
  });

  const configuracaoColunaImparPar: EstruturaFisicaConfiguracaoColuna = new EstruturaFisicaConfiguracaoColuna('coluna', {
    ativo: true,
    descricaoPadrao: 'Coluna',
    descricao: '',
    descricaoMobilePadrao: 'C',
    descricaoMobile: '',
    ladoDireito: {
      prefixo: '',
      tipoNumeracaoColuna: 'IMPAR'
    },
    ladoEsquerdo: {
      prefixo: '',
      tipoNumeracaoColuna: 'PAR'
    }
  });

  const configuracaoColunaPrefixo: EstruturaFisicaConfiguracaoColuna = new EstruturaFisicaConfiguracaoColuna('coluna', {
    ativo: true,
    descricaoPadrao: 'Coluna',
    descricao: 'Prédio',
    descricaoMobilePadrao: 'C',
    descricaoMobile: 'P',
    ladoDireito: {
      prefixo: 'PD',
      tipoNumeracaoColuna: null
    },
    ladoEsquerdo: {
      prefixo: 'PE',
      tipoNumeracaoColuna: null
    }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    formBuilder = TestBed.get(FormBuilder);
    estruturaFisicaEditarForm = new EstruturaFisicaEditarForm(formBuilder);
  });

  it('Deve instanciar um formulário de edição de estrutura física', () => {
    expect(estruturaFisicaEditarForm).toBeDefined();
  });

  it('Utilitário para o formulário de edição de estrutura física deve ser instanciado', () => {
    expect(estruturaFisicaEditarForm.utils).toBeDefined();
    expect(estruturaFisicaEditarForm.utils.executeFormValidation()).toBe(true);
  });

  it('Deve incluir uma configuração padrão não personalizada', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoPadrao('bloco', configuracaoBloco);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    const bloco = estruturaFisicaEditarForm.configuracoes[0];
    expect(bloco.tipoConfiguracao).toBe('bloco');
    expect(bloco.ativo).toBe(false);
    expect(bloco.label).toBe('bloco');
    expect(bloco.descricaoPadrao).toBe('Bloco');
    expect(bloco.descricaoMobilePadrao).toBe('B');
    expect(bloco.descricao).toBe('');
    expect(bloco.descricaoMobile).toBe('');
    expect(bloco.abreviaturaPersonalizada).toBe('NAO');
    expect(bloco.nomenclaturaPersonalizada).toBe('NAO');
  });

  it('Deve incluir uma configuração padrão personalizada', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoPadrao('rua', configuracaoRua);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    const rua = estruturaFisicaEditarForm.configuracoes[0];
    expect(rua.tipoConfiguracao).toBe('rua');
    expect(rua.ativo).toBe(true);
    expect(rua.label).toBe('rua');
    expect(rua.descricaoPadrao).toBe('Rua');
    expect(rua.descricaoMobilePadrao).toBe('R');
    expect(rua.descricao).toBe('Corredor');
    expect(rua.descricaoMobile).toBe('C');
    expect(rua.abreviaturaPersonalizada).toBe('SIM');
    expect(rua.nomenclaturaPersonalizada).toBe('SIM');
  });

  it('Deve incluir uma configuração: coluna', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColuna);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    const coluna = estruturaFisicaEditarForm.configuracoes[0] as EstruturaFisicaConfiguracaoColunaForm;
    expect(coluna.tipoConfiguracao).toBe('coluna');
    expect(coluna.ativo).toBe(false);
    expect(coluna.label).toBe('coluna');
    expect(coluna.descricaoPadrao).toBe('Coluna');
    expect(coluna.descricaoMobilePadrao).toBe('C');
    expect(coluna.descricao).toBe('');
    expect(coluna.descricaoMobile).toBe('');
    expect(coluna.abreviaturaPersonalizada).toBe('NAO');
    expect(coluna.nomenclaturaPersonalizada).toBe('NAO');
    expect(coluna.definirLado).toBe(false);
  });

  it('Deve incluir uma configuração: coluna, direita par, esquerda impar', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColunaParImpar);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    const coluna = estruturaFisicaEditarForm.configuracoes[0] as EstruturaFisicaConfiguracaoColunaForm;
    expect(coluna.tipoConfiguracao).toBe('coluna');
    expect(coluna.ativo).toBe(true);
    expect(coluna.label).toBe('coluna');
    expect(coluna.descricaoPadrao).toBe('Coluna');
    expect(coluna.descricaoMobilePadrao).toBe('C');
    expect(coluna.descricao).toBe('');
    expect(coluna.descricaoMobile).toBe('');
    expect(coluna.abreviaturaPersonalizada).toBe('NAO');
    expect(coluna.nomenclaturaPersonalizada).toBe('NAO');
    expect(coluna.definirLado).toBe(true);
    expect(coluna.opcaoLado).toBe('LADO_ESQUERDO_IMPAR_DIREITO_PAR');
    expect(coluna.utilizaPrefixo).toBe('NAO');
    expect(coluna.prefixoDireito).toBe('');
    expect(coluna.prefixoEsquerdo).toBe('');
  });

  it('Deve incluir uma configuração: coluna, direita impar, esquerda par', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColunaImparPar);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    const coluna = estruturaFisicaEditarForm.configuracoes[0] as EstruturaFisicaConfiguracaoColunaForm;
    expect(coluna.tipoConfiguracao).toBe('coluna');
    expect(coluna.ativo).toBe(true);
    expect(coluna.label).toBe('coluna');
    expect(coluna.descricaoPadrao).toBe('Coluna');
    expect(coluna.descricaoMobilePadrao).toBe('C');
    expect(coluna.descricao).toBe('');
    expect(coluna.descricaoMobile).toBe('');
    expect(coluna.abreviaturaPersonalizada).toBe('NAO');
    expect(coluna.nomenclaturaPersonalizada).toBe('NAO');
    expect(coluna.definirLado).toBe(true);
    expect(coluna.opcaoLado).toBe('LADO_ESQUERDO_PAR_DIREITO_IMPAR');
    expect(coluna.utilizaPrefixo).toBe('NAO');
    expect(coluna.prefixoDireito).toBe('');
    expect(coluna.prefixoEsquerdo).toBe('');
  });

  it('Deve incluir uma configuração: coluna, utiliza prefixo', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColunaPrefixo);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    const coluna = estruturaFisicaEditarForm.configuracoes[0] as EstruturaFisicaConfiguracaoColunaForm;
    expect(coluna.tipoConfiguracao).toBe('coluna');
    expect(coluna.ativo).toBe(true);
    expect(coluna.label).toBe('coluna');
    expect(coluna.descricaoPadrao).toBe('Coluna');
    expect(coluna.descricaoMobilePadrao).toBe('C');
    expect(coluna.descricao).toBe('Prédio');
    expect(coluna.descricaoMobile).toBe('P');
    expect(coluna.abreviaturaPersonalizada).toBe('SIM');
    expect(coluna.nomenclaturaPersonalizada).toBe('SIM');
    expect(coluna.definirLado).toBe(true);
    expect(coluna.opcaoLado).toBe('LADO_UTILIZA_PREFIXO');
    expect(coluna.utilizaPrefixo).toBe('SIM');
    expect(coluna.prefixoDireito).toBe('PD');
    expect(coluna.prefixoEsquerdo).toBe('PE');
  });

  it('Deve mapear as configuracoes para a interface de configuração da estrutura física', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoPadrao('bloco', configuracaoBloco);
    estruturaFisicaEditarForm.incluirConfiguracaoPadrao('rua', configuracaoRua);
    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColunaParImpar);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(3);

    expect(estruturaFisicaEditarForm.mapTo()).toEqual(new EstruturaFisicaConfiguracoes({
      id: '',
      unidadeId: '',
      alterado: false,
      tipo: 'PATIO',
      ativo: true,
      bloco: {
        ativo: false,
        descricaoPadrao: 'Bloco',
        descricao: '',
        descricaoMobilePadrao: 'B',
        descricaoMobile: ''
      },
      rua: {
        ativo: true,
        descricaoPadrao: 'Rua',
        descricao: 'Corredor',
        descricaoMobilePadrao: 'R',
        descricaoMobile: 'C'
      },
      coluna: {
        ativo: true,
        descricaoPadrao: 'Coluna',
        descricao: '',
        descricaoMobilePadrao: 'C',
        descricaoMobile: '',
        ladoDireito: {
          prefixo: undefined,
          tipoNumeracaoColuna: 'PAR'
        },
        ladoEsquerdo: {
          prefixo: undefined,
          tipoNumeracaoColuna: 'IMPAR'
        }
      }
    }));
  });

  it('Deve mapear as configuracoes quando a coluna utiliza prefixo', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColunaPrefixo);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    expect(estruturaFisicaEditarForm.mapTo()).toEqual(new EstruturaFisicaConfiguracoes({
      id: '',
      unidadeId: '',
      alterado: false,
      tipo: 'PATIO',
      ativo: true,
      coluna: {
        ativo: true,
        descricaoPadrao: 'Coluna',
        descricao: 'Prédio',
        descricaoMobilePadrao: 'C',
        descricaoMobile: 'P',
        ladoDireito: {
          prefixo: 'PD',
          tipoNumeracaoColuna: null
        },
        ladoEsquerdo: {
          prefixo: 'PE',
          tipoNumeracaoColuna: null
        }
      }
    }));
  });

  it('Deve mapear as configuracoes quando a coluna não define lado', () => {

    estruturaFisicaEditarForm.incluirConfiguracaoColuna(configuracaoColuna);

    expect(estruturaFisicaEditarForm.configuracoes.length).toBe(1);

    expect(estruturaFisicaEditarForm.mapTo() as any).toEqual(new EstruturaFisicaConfiguracoes({
      id: '',
      unidadeId: '',
      alterado: false,
      tipo: 'PATIO',
      ativo: true,
      coluna: {
        ativo: false,
        descricaoPadrao: 'Coluna',
        descricao: '',
        descricaoMobilePadrao: 'C',
        descricaoMobile: ''
      }
    }) as any);
  });
});
