
import { IDisciplinaGetAll } from './../../../../src/app/controle-matricula/disciplina/entities/disciplina-get-all.interface';
export const collectionName = 'disciplinas';

export const disciplinas: Array<IDisciplinaGetAll> = [
  {
    id: '6e570903-a639-47cc-8736-91bb99a651b5',
    descricao: 'Algotítimos',
    sigla: 'ALG',
    cargaHoraria: 60
  },
  {
    id: '8449ef66-72f3-48d4-9bf7-fa88d6996c2b',
    descricao: 'Programação',
    sigla: 'PRO',
    cargaHoraria: 60
  },
  {
    id: 'c6239ad0-86ff-4f16-8a91-534b2f46dc41',
    descricao: 'Arquitetura de computadores',
    sigla: 'ARQ',
    cargaHoraria: 50
  },
  {
    id: '3bee5375-9b5b-481e-a6ca-c4a28e9e4264',
    descricao: 'Eletrônica',
    sigla: 'ELE',
    cargaHoraria: 50
  },
  {
    id: '41994222-399c-49b2-ad76-351a8fb4a10d',
    descricao: 'Microcontroladores',
    sigla: 'MIC',
    cargaHoraria: 40
  },
  {
    id: '024871df-4d7e-4efc-af90-f77c17103e91',
    descricao: 'Estatistica',
    sigla: 'EST',
    cargaHoraria: 40
  },
  {
    id: 'c1cc6f55-8dd8-420a-8201-e3e8328167c0',
    descricao: 'Cálculo',
    sigla: 'CAL',
    cargaHoraria: 40
  }
];

export function mapToInterface(disciplina: any): any {

  return {
    id: disciplina.id,
    disciplinas: disciplina.disciplinas,
    ano: disciplina.ano,
    nrVagas: disciplina.nrVagas
  };
}
