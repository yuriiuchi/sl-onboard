import { maskBr } from '../../../shared/formatUtils/mask';
import { IDocumentoExpedicaoListar } from './documento-expedicao-get-all.interface';
import { SituacaoDocumentoProcessoEnum } from '../situacao-documento-processo-enum';
import { isEmptyString } from 'src/app/shared/utils/utils';

interface IDocumentoExpedicaoPessoa {
  id?: string;
  nome: string;
  documentoIdentificacao: string;
  pessoaFisica: boolean;
}

export class DocumentoExpedicaoListar {

  constructor(
    public id: string,
    public identificadorDocumento: string,
    public dataEmissao: Date,
    public depositante: IDocumentoExpedicaoPessoa,
    public destinatario: IDocumentoExpedicaoPessoa,
    public transportadora: IDocumentoExpedicaoPessoa,
    public situacaoDocumentoProcesso: SituacaoDocumentoProcessoEnum
  ) {}

  get depositanteFormatado(): string {
    if (this.depositante) {
      if (this.depositante.pessoaFisica) {
          return maskBr.cpf(this.depositante.documentoIdentificacao) + ' - ' + this.depositante.nome;
      } else {
          return maskBr.cnpj(this.depositante.documentoIdentificacao) + ' - ' + this.depositante.nome;
      }
    } else {
      return '';
    }
  }

  get destinatarioFormatado(): string {
    if (this.destinatario) {
      if (this.destinatario.pessoaFisica) {
          return maskBr.cpf(this.destinatario.documentoIdentificacao) + ' - ' + this.destinatario.nome;
      } else {
          return maskBr.cnpj(this.destinatario.documentoIdentificacao) + ' - ' + this.destinatario.nome;
      }
    } else {
      return '';
    }
  }

  get transportadoraFormatado(): string {
    if (this.transportadora) {
      if (this.transportadora.pessoaFisica) {
          return maskBr.cpf(this.transportadora.documentoIdentificacao) + ' - ' + this.transportadora.nome;
      } else {
          return maskBr.cnpj(this.transportadora.documentoIdentificacao) + ' - ' + this.transportadora.nome;
      }
    } else {
      return '';
    }
  }

  static fromDto(dto: IDocumentoExpedicaoListar) {
    const situacaoDocumentoProcesso = SituacaoDocumentoProcessoEnum.find(dto.situacaoDocumentoProcesso);
    const transportadora = (dto.transportadoraNome) ?
      {
        nome: dto.transportadoraNome,
        documentoIdentificacao: dto.transportadoraDocumentoIdentificacao,
        pessoaFisica: dto.transportadoraPessoFisica
      } : undefined;
    const depositante = (dto.depositanteNome) ?
    {
      nome: dto.depositanteNome,
      documentoIdentificacao: dto.depositanteDocumentoIdentificacao,
      pessoaFisica: dto.depositantePessoFisica
    } : undefined;
    const destinatario = (dto.destinatarioNome) ?
    {
      nome: dto.destinatarioNome,
      documentoIdentificacao: dto.destinatarioDocumentoIdentificacao,
      pessoaFisica: dto.destinatarioPessoFisica
    } : undefined;
    return new DocumentoExpedicaoListar(
      dto.id,
      dto.identificadorDocumento,
      new Date(dto.dataEmissao),
      depositante,
      destinatario,
      transportadora,
      situacaoDocumentoProcesso
    );
  }
}
