// tslint:disable-next-line: max-line-length
import { ITurmaGetAll } from './../../../../src/app/controle-matricula/turma/entities/turma-get-all.interface';
//import { fornecedores } from 'e2e/src/fornecedor/fornecedor.mock';
export const collectionName = 'turma';

export const turma: Array<ITurmaGetAll> = [
  {
    id: '89d102cd-7197-486a-b0bf-1f4ec1ae2e21',
    descricao: "Minha Turma 01",
    ano: 2019,
    nrVagas: 20,
  },
  {
    id: 'd9533bf2-95de-447c-9afc-5a686880d652',
    descricao: "Minha Turma 02",
    ano: 2019,
    nrVagas: 35,
  },
  {
    id: 'efe16409-bff4-48c5-8d89-1a519decf3ba',
    descricao: "Minha Turma 03",
    ano: 2019,
    nrVagas: 25,
  },
  {
    id: '6d7e918a-e1c1-4eef-9436-07b1e7cab5f5',
    descricao: "Minha Turma 04",
    ano: 2019,
    nrVagas: 15,
  },
  {
    id: 'eb1d2ef3-2740-4945-98b4-5d4df13b5600',
    descricao: "Minha Turma 05",
    ano: 2019,
    nrVagas: 40,
  },
  {
    id: 'dd7f0ac5-0d31-4430-93d4-869a197b6739',
    descricao: "Minha Turma 06",
    ano: 2019,
    nrVagas: 30,
  },
  {
    id: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5',
    descricao: "Minha Turma 07",
    ano: 2019,
    nrVagas: 20,
  }
];

export function mapToInterface(turma: any): any {

  return {
    id: turma.id,
    disciplinas: turma.disciplinas,
    ano: turma.ano,
    nrVagas: turma.nrVagas
  };
}
