import { IEstruturaFisicaConfiguracao } from './estrutura-fisica-configuracao.interface';

export class EstruturaFisicaConfiguracao {

  ativo: boolean;
  label: string;
  descricaoPadrao: string;
  descricao: string;
  descricaoMobilePadrao: string;
  descricaoMobile: string;

  get descricaoApresentacao(): string {
    return this.descricao || this.descricaoPadrao;
  }

  get descricaoMobileApresentacao(): string {
    return this.descricaoMobile || this.descricaoMobilePadrao;
  }

  get descricaoCompletaApresentacao(): string {
    return `${this.descricaoApresentacao} (${this.descricaoMobileApresentacao})`;
  }

  constructor(label: string, estruturaFisicaConfiguracao: IEstruturaFisicaConfiguracao) {
    this.label = label;
    this.ativo = estruturaFisicaConfiguracao.ativo;
    this.descricaoPadrao = estruturaFisicaConfiguracao.descricaoPadrao;
    this.descricao = estruturaFisicaConfiguracao.descricao;
    this.descricaoMobilePadrao = estruturaFisicaConfiguracao.descricaoMobilePadrao;
    this.descricaoMobile = estruturaFisicaConfiguracao.descricaoMobile;
  }
}
