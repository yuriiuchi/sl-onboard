import { TipoEstruturaFisicaEnum } from 'src/app/entidades/tipo-estrutura-fisica.enum';
import { EnderecoAlcanceConsultaEnum } from './endereco-alcance-consulta.enum';
import { IEnderecoConsultar } from './endereco-consultar.interface';
import { EnderecoFuncaoConsultaEnum } from './endereco-funcao-consulta.enum';

export class EnderecoConsultar {
  id: string;
  deposito: string;
  descricao: string;
  descricaoMobile: string;
  estruturaFisica: TipoEstruturaFisicaEnum;
  funcao: EnderecoFuncaoConsultaEnum;
  andarAcessivelMao: EnderecoAlcanceConsultaEnum;
  capacidadeUnitizador: string;
  quantidadeUnitizadorArmazenado: string;
  codigoBarras: string;

  constructor(
    id: string,
    deposito: string,
    descricao: string,
    descricaoMobile: string,
    estruturaFisica: TipoEstruturaFisicaEnum,
    funcao: EnderecoFuncaoConsultaEnum,
    andarAcessivelMao: EnderecoAlcanceConsultaEnum,
    capacidadeUnitizador: string,
    quantidadeUnitizadorArmazenado: string,
    codigoBarras: string
  ) {
    this.id = id;
    this.deposito = deposito;
    this.descricao = descricao;
    this.descricaoMobile = descricaoMobile;
    this.estruturaFisica = estruturaFisica;
    this.funcao = funcao;
    this.andarAcessivelMao = andarAcessivelMao;
    this.capacidadeUnitizador = capacidadeUnitizador;
    this.quantidadeUnitizadorArmazenado = quantidadeUnitizadorArmazenado;
    this.codigoBarras = codigoBarras;
  }

  static fromDto(dto: IEnderecoConsultar) {
    let andarAcessivelMao: EnderecoAlcanceConsultaEnum;
    if (dto.andarAcessivelMao === null) {
      andarAcessivelMao = EnderecoAlcanceConsultaEnum.NAO_APLICAVEL();
    } else if (dto.andarAcessivelMao === true) {
      andarAcessivelMao = EnderecoAlcanceConsultaEnum.ACESSIVEL_A_MAO();
    } else {
      andarAcessivelMao = EnderecoAlcanceConsultaEnum.NAO_ACESSIVEL_A_MAO();
    }

    return new EnderecoConsultar(
      dto.id,
      dto.deposito.descricao,
      dto.descricao,
      dto.descricaoMobile,
      TipoEstruturaFisicaEnum.values.find((tipo) => tipo.value === dto.estruturaFisica.tipo),
      EnderecoFuncaoConsultaEnum.values.find((tipo) => tipo.value === dto.funcao),
      andarAcessivelMao,
      dto.capacidadeUnitizador,
      dto.unitizadorArmazenadoQuantidade,
      dto.codigoBarras
    );
  }
}
