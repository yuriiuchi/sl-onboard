import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'totvs-log-base-foundation';
import { ConsultaCepService } from './busca-cep.services';
import { HttpXhrBackend, XhrFactory } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class BrowserXhr implements XhrFactory {
  constructor() {}
  build(): any { return new XMLHttpRequest(); }
}

const xhrFactory = new BrowserXhr();

describe('busca-cep.service.spec | ConsultaCepService', () => {

  let servico: ConsultaCepService;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsultaCepService,
        HttpXhrBackend,
        {provide: XhrFactory, useValue: xhrFactory}],
      imports: [HttpClientTestingModule]
    });
  });

  beforeEach(() => {
    servico = TestBed.get(ConsultaCepService);
  });

  it('Deve instanciar o serviço', () => {
    expect(servico).toBeTruthy();
  });

  xit('Deve retornar o cep', (done: DoneFn) => {
    servico.consultaCEP('89220200')
    .then(retorno => {
      expect(retorno.cep).toBe('89220-200');
      expect(retorno.logradouro).toBe('Rua Pavão');
      expect(retorno.bairro).toBe('Costa e Silva');
      expect(retorno.uf).toBe('SC');
      expect(retorno.ibge).toBe('4209102');
      expect(retorno.localidade).toBe('Joinville');
      done();
    });
  });
});
