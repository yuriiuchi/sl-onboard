import { TestBed } from '@angular/core/testing';
import { PoDisclaimer } from '@portinari/portinari-ui';
import { configureTestSuite, DefaultDateViewConverterService } from 'totvs-log-base-foundation';
import { FndTestModule } from './../../mocks/fnd-test-module/fnd-test.module.mock';
import { DisclaimerGroupHelperService, IDisclaimerParamsConfig } from './disclaimer-group-helper.service';

describe('disclaimer-group-helper.service.spec | DisclaimerGroupHelperService', () => {

  let service: DisclaimerGroupHelperService;

  configureTestSuite(() =>
    TestBed.configureTestingModule({
      imports: [
        FndTestModule
      ],
      providers: [
        DefaultDateViewConverterService,
        DisclaimerGroupHelperService
      ],
    })
  );

  beforeEach(() => {
    service = TestBed.get(DisclaimerGroupHelperService);
  });

  it('Deve instanciar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar um disclaimer padrão', () => {
    const params = {
      param1: 'valor1',
      param2: 'valor2'
    };
    const disclaimers: PoDisclaimer[] = service.getDisclaimers(params);

    expect(disclaimers.length).toBe(2);
    expect(disclaimers[0].property).toBe('param1');
    expect(disclaimers[0].value).toBe('valor1');
    expect(disclaimers[1].property).toBe('param2');
    expect(disclaimers[1].value).toBe('valor2');
  });

  it('Deve retornar um disclaimer customizado', () => {
    const formatFn = (value: any): string => {
      return value === 'VINCULADO' ? 'Vinculado' : 'Não Vinculado';
    };
    const params: any = {
      numero: '10000',
      depositanteId: 'ed81e34c-88f7-428f-a197-d21a5c4fb712',
      depositanteNome: '67.832.900/0001-76 - Depositante 414D97E8',
      dataEmissaoDe: new Date('2019-09-04T03:00:00.000Z'),
      situacaoDocumentoProcesso: ['VINCULADO', 'NAO_VINCULADO'],
    };
    const config: IDisclaimerParamsConfig[] = [
      { param: 'numero', literal: 'documento' },
      { param: 'depositanteId', literal: 'depositante', displayValue: 'depositanteNome' },
      { param: 'dataEmissaoDe', format: 'date' },
      { param: 'situacaoDocumentoProcesso', literal: 'situacao', format: formatFn},
    ];

    const disclaimers: PoDisclaimer[] = service.getDisclaimers(params, config, ['depositanteNome']);

    expect(disclaimers.length).toBe(5);
    expect(disclaimers[0].property).toBe('numero');
    expect(disclaimers[0].value).toBe('10000');
    expect(disclaimers[0].label).toBe('Documento: 10000');
    expect(disclaimers[1].property).toBe('depositanteId');
    expect(disclaimers[1].value).toBe('ed81e34c-88f7-428f-a197-d21a5c4fb712');
    expect(disclaimers[1].label).toBe('Depositante: 67.832.900/0001-76 - Depositante 414D97E8');
    expect(disclaimers[2].property).toBe('dataEmissaoDe');
    expect(disclaimers[2].value).toBe(params.dataEmissaoDe);
    expect(disclaimers[2].label).toBe('Data emissão de: 04/09/2019');
    expect(disclaimers[3].property).toBe('situacaoDocumentoProcesso');
    expect(disclaimers[3].value).toBe('VINCULADO');
    expect(disclaimers[3].label).toBe('Situação: Vinculado');
    expect(disclaimers[4].property).toBe('situacaoDocumentoProcesso');
    expect(disclaimers[4].value).toBe('NAO_VINCULADO');
    expect(disclaimers[4].label).toBe('Situação: Não Vinculado');
  });

  it('Deve retornar o filtro com base nos disclaimers', () => {

    const disclaimers: PoDisclaimer[] = [
      { property: 'param1', value: 'valor1' },
      { property: 'param2', value: 'valor2' },
      { property: 'param3', value: 'valor1-3' },
      { property: 'param3', value: 'valor2-3' },
      { property: 'param3', value: 'valor3-3' },
    ];

    const params = service.getFilters(disclaimers);

    expect(Object.keys(params).length).toBe(3);
    expect(params.param1).toBeDefined();
    expect(params.param1).toBe('valor1');
    expect(params.param2).toBeDefined();
    expect(params.param2).toBe('valor2');
    expect(params.param3).toBeDefined();
    expect(params.param3.length).toBe(3);
    expect(params.param3[0]).toBe('valor1-3');
    expect(params.param3[1]).toBe('valor2-3');
    expect(params.param3[2]).toBe('valor3-3');
  });

});
