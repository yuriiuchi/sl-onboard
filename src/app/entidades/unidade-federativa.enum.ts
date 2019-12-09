import { PoCheckboxGroupOption, PoSelectOption } from '@portinari/portinari-ui';

export enum UnidadeFederativa {
  'AC' = 'Acre',
  'AL' = 'Alagoas',
  'AP' = 'Amapá',
  'AM' = 'Amazonas',
  'BA' = 'Bahia',
  'CE' = 'Ceará',
  'DF' = 'Distrito Federal',
  'ES' = 'Espírito Santo',
  'GO' = 'Goiás',
  'MA' = 'Maranhão',
  'MT' = 'Mato Grosso',
  'MS' = 'Mato Grosso do Sul',
  'MG' = 'Minas Gerais',
  'PA' = 'Pará',
  'PB' = 'Paraíba',
  'PR' = 'Paraná',
  'PE' = 'Pernambuco',
  'PI' = 'Piauí',
  'RJ' = 'Rio de Janeiro',
  'RN' = 'Rio Grande do Norte',
  'RS' = 'Rio Grande do Sul',
  'RO' = 'Rondônia',
  'RR' = 'Roraima',
  'SC' = 'Santa Catarina',
  'SP' = 'São Paulo',
  'SE' = 'Sergipe',
  'TO' = 'Tocantins',
  'EX' = 'Exterior'
}
export function opcoesUFThfCombo(): Array<PoCheckboxGroupOption>  {
  return Object.entries(UnidadeFederativa).map(x => ({
    label: x[1],
    value: x[0]
  }));
}
export function opcoesUFThfSelect(): Array<PoSelectOption>  {
  return Object.entries(UnidadeFederativa).map(x => ({
    label: x[1],
    value: x[0]
  }));
}
