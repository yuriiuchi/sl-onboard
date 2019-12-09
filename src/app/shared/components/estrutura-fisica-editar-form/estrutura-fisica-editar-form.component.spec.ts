import { EstruturaFisicaConfiguracaoPadraoForm } from './entities/estrutura-fisica-configuracao-padrao.form';
import { EstruturaFisicaConfiguracaoColunaForm } from './entities/estrutura-fisica-configuracao-coluna.form';
import { EstruturaFisica } from '../../../entidades/estrutura-fisica.entity';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EstruturaFisicaEditarFormComponent } from './estrutura-fisica-editar-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PoModule, PoSwitchLabelPosition, PoTagOrientation, PoTagType } from '@portinari/portinari-ui';
import { FndTestModule } from './../../../mocks/fnd-test-module/fnd-test.module.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstruturaFisicaBuilderTest } from './../../../configuracao/tests/estrutura-fisica-builder.test';

describe('estrutura-fisica-editar-form.component.spec | EstruturaFisicaEditarFormComponent', () => {

  let component: EstruturaFisicaEditarFormComponent;
  let fixture: ComponentFixture<EstruturaFisicaEditarFormComponent>;

  const estruturaFisica: EstruturaFisica = EstruturaFisicaBuilderTest
    .builder()
    .withId('teste')
    .withTipo('PATIO')
    .ativado()
    .withBloco(false)
    .withRua(true, 'Corredor', 'C')
    .withColuna()
    .buildEntidade();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EstruturaFisicaEditarFormComponent
      ],
      imports: [
        RouterTestingModule,
        PoModule,
        FndTestModule,
        FormsModule,
        ReactiveFormsModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstruturaFisicaEditarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve construir o componente sem estrutura física', () => {
    expect(component).toBeTruthy();
  });

  it('Componente deve ignorar estrutura física nula', () => {
    component.estruturaFisica = null;
    expect(component.estruturaFisica).toBeUndefined();
  });

  it('Componente deve receber uma estrutura física', () => {

    component.estruturaFisica = estruturaFisica;

    expect(component.form.configuracoes.length).toBe(3);
    expect(component.descricaoTipoEstrutura).toBe('Pátio');
    expect(component.posicaoLabelDireita).toBe(PoSwitchLabelPosition.Right);
    expect(component.orientacaoTipoVisualizacao).toBe(PoTagOrientation.Horizontal);
    expect(component.tipoTagVisualizacao).toBe(PoTagType.Success);
    expect(component.opcoesSimNao.length).toBe(2);
    expect(component.opcoesDefinicaoLado.length).toBe(3);
    expect(component.tamanhoMaximoDescricao).toBe(EstruturaFisicaConfiguracaoPadraoForm.TAMANHO_MAXIMO_DESCRICAO);
    expect(component.tamanhoMaximoDescricaoMobile).toBe(EstruturaFisicaConfiguracaoPadraoForm.TAMANHO_MAXIMO_DESCRICAO_MOBILE);
    expect(component.tamanhoMaximoPrefixo).toBe(EstruturaFisicaConfiguracaoColunaForm.TAMANHO_MAXIMO_PREFIXO);
  });

  it('Componente deve retornar a informação se o formulário está válido', () => {

    component.estruturaFisica = estruturaFisica;

    expect(component.formularioEstaValido()).toBe(true);
  });

  it('Componente deve retornar os dados do formulário', () => {

    expect(component.getEstruturaFisicaAtualizada()).toBeUndefined();

    component.estruturaFisica = estruturaFisica;

    expect(component.getEstruturaFisicaAtualizada()).toBeDefined();
  });
});
