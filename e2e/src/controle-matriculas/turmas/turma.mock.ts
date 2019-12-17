
import { ITurmaGetAll } from './../../../../src/app/controle-matricula/turma/entities/turma-get-all.interface';
export const collectionName = 'turma';

export const turma: Array<ITurmaGetAll> = [
  {
    id: '89d102cd-7197-486a-b0bf-1f4ec1ae2e21',
    descricao: "Minha Turma 01",
    inicio: new Date(),
    nrVagas: 20,
    listDisciplinas: [
      {
        id: "6e570903-a639-47cc-8736-91bb99a651b5",
        descricao: "Algotítimos",
        sigla: "ALG",
        cargaHoraria: 60
      },
      {
        id: "8449ef66-72f3-48d4-9bf7-fa88d6996c2b",
        descricao: "Programação",
        sigla: "PRO",
        cargaHoraria: 60
      }
    ],
    listAlunos: [
      {
        id: 'ff0d32a4-f6f3-4319-89b7-d657d869c95c',
        nome: 'Aluno 01',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
  },
  {
    id: 'd9533bf2-95de-447c-9afc-5a686880d652',
    descricao: "Minha Turma 02",
    inicio: new Date(),
    nrVagas: 35,
    listDisciplinas: [
      {
        id: "c6239ad0-86ff-4f16-8a91-534b2f46dc41",
        descricao: "Arquitetura de computadores",
        sigla: "ARQ",
        cargaHoraria: 50
      },
      {
        id: "3bee5375-9b5b-481e-a6ca-c4a28e9e4264",
        descricao: "Eletrônica",
        sigla: "ELE",
        cargaHoraria: 50
      }
    ],
    listAlunos: [
      {
        id: 'b8fa33b2-065e-407d-8853-da8e460e1ddc',
        nome: 'Aluno 01',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
  },
  {
    id: 'efe16409-bff4-48c5-8d89-1a519decf3ba',
    descricao: "Minha Turma 03",
    inicio: new Date(),
    nrVagas: 25,
    listDisciplinas: [],
    listAlunos: [
      {
        id: 'ff0d32a4-f6f3-4319-89b7-d657d869c95c',
        nome: 'Aluno 01',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      },
      {
        id: 'b8fa33b2-065e-407d-8853-da8e460e1ddc',
        nome: 'Aluno 01',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
  },
  {
    id: '6d7e918a-e1c1-4eef-9436-07b1e7cab5f5',
    descricao: "Minha Turma 04",
    inicio: new Date(),
    nrVagas: 15,
    listDisciplinas: [
      {
        id: "41994222-399c-49b2-ad76-351a8fb4a10d",
        descricao: "Microcontroladores",
        sigla: "MIC",
        cargaHoraria: 40
      },
      {
        id: "024871df-4d7e-4efc-af90-f77c17103e91",
        descricao: "Estatistica",
        sigla: "EST",
        cargaHoraria: 40
      }
    ],
    listAlunos: [
      {
        id: '43f46843-612f-421c-8746-271602f20861',
        nome: 'Aluno 03',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      },
      {
        id: 'bfb006d9-23aa-417f-ae72-0a6706d9288f',
        nome: 'Aluno 04',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
  },
  {
    id: 'eb1d2ef3-2740-4945-98b4-5d4df13b5600',
    descricao: "Minha Turma 05",
    inicio: new Date(),
    nrVagas: 40,
    listDisciplinas: [],
    listAlunos: [
      {
        id: 'bfb006d9-23aa-417f-ae72-0a6706d9288f',
        nome: 'Aluno 04',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
  },
  {
    id: 'dd7f0ac5-0d31-4430-93d4-869a197b6739',
    descricao: "Minha Turma 06",
    inicio: new Date(),
    nrVagas: 30,
    listDisciplinas: [
      {
        id: "c1cc6f55-8dd8-420a-8201-e3e8328167c0",
        descricao: "Cálculo",
        sigla: "CAL",
        cargaHoraria: 40
      }
    ],
    listAlunos: [
      {
        id: '43f46843-612f-421c-8746-271602f20861',
        nome: 'Aluno 03',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
  },
  {
    id: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5',
    descricao: "Minha Turma 07",
    inicio: new Date(),
    nrVagas: 20,
    listDisciplinas: [
      {
        id: "024871df-4d7e-4efc-af90-f77c17103e91",
        descricao: "Estatistica",
        sigla: "EST",
        cargaHoraria: 40
      }
    ],
    listAlunos: [
      {
        id: '86cced0c-b6de-4a17-aa22-a88ab4d4f81d',
        nome: 'Aluno 08',
        email: 'aluno01@totvs.com.br',
        cpf: '0293745511',
        matricula: 1500,
        formaIngresso: 'EAD',
        //turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
      }
    ]
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
