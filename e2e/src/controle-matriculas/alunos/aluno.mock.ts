import { IAlunoGetAll } from './../../../../src/app/controle-matricula/aluno/entities/aluno-get-all.interface';
//import { Guid } from "guid-typescript";
//import * as uuid from '';

export const collectionName = 'aluno';

export const aluno: Array<IAlunoGetAll> = [
  {
    id: 'ff0d32a4-f6f3-4319-89b7-d657d869c95c',
    nome: 'Aluno 01',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: 'b8fa33b2-065e-407d-8853-da8e460e1ddc',
    nome: 'Aluno 01',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: '43f46843-612f-421c-8746-271602f20861',
    nome: 'Aluno 03',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: 'bfb006d9-23aa-417f-ae72-0a6706d9288f',
    nome: 'Aluno 04',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: 'ee1f27d0-41d0-4c11-bb0f-9fc8e611a1d3',
    nome: 'Aluno 05',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: '568e9bcc-4a2c-4a2b-83e6-b6bcedbd2f92',
    nome: 'Aluno 06',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: 'c2587dd7-a066-4627-bc0a-93f2edf3a43b',
    nome: 'Aluno 07',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  },
  {
    id: '86cced0c-b6de-4a17-aa22-a88ab4d4f81d',
    nome: 'Aluno 08',
    email: 'aluno01@totvs.com.br',
    cpf: '0293745511',
    matricula: 1500,
    formaIngresso: 'EAD',
    turmaId: 'e34f3f2b-f21f-459c-b203-55ae6e81e8a5'
  }
];

export function mapToInterface(aluno: any): any {
  return {
    nome: aluno.nome,
    email: aluno.email,
    cpf: aluno.cpf,
    matricula: aluno.matricula,
    formaIngresso: aluno.formaIngresso,
    turmaId: aluno.turmaId
  };
}
