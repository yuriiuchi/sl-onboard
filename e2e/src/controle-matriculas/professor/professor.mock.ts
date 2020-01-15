
import { IProfessorGetAll } from './../../../../src/app/controle-matricula/professor/entities/professor-get-all.interface';
export const collectionName = 'professor';

export const professor: Array<IProfessorGetAll> = [
  {
    id: '4de2a143-8b78-4623-bfe9-f349266c0f69',
    nome: 'Professor 01',
    email: 'professor01@totvs.com.br',
    cpf: '89047050029',
    titulacao: 'mestre',
  },
  {
    id: '1389396a-68a0-46f9-a05d-562a969048b6',
    nome: 'Professor 02',
    email: 'professor02@totvs.com.br',
    cpf: '25155141036',
    titulacao: 'mestre',
  },
  {
    id: '0e5779ff-78a6-416f-a0db-590d71771f65',
    nome: 'Professor 03',
    email: 'professor03@totvs.com.br',
    cpf: '64799696009',
    titulacao: 'doutor',
  },
  {
    id: '5396e9b2-9c3e-42d7-833c-9f994cdd1b6e',
    nome: 'Professor 04',
    email: 'professor04@totvs.com.br',
    cpf: '03760772048',
    titulacao: 'doutor',
  },
  {
    id: 'eca9999c-a85c-4238-8e59-d3f5edcd290c',
    nome: 'Professor 05',
    email: 'professor05@totvs.com.br',
    cpf: '62179834004',
    titulacao: 'PHD',
  },
  {
    id: 'ae955156-23a5-4692-8d39-40b1d7135301',
    nome: 'Professor 06',
    email: 'professor06@totvs.com.br',
    cpf: '80121831027',
    titulacao: 'PHD',
  },
  {
    id: 'b1927815-955d-4e06-b73d-75b21645307a',
    nome: 'Professor 07',
    email: '',
    cpf: '58033729007',
    titulacao: 'doutor',
  }
];

export function mapToInterface(professor: any): any {

  return {
    id: professor.id,
    nome: professor.nome,
    email: professor.email,
    cpf: professor.cpf,
    titulacao: professor.titulacao
  };
}
