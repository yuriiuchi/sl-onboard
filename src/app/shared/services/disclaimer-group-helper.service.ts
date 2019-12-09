import { Injectable } from '@angular/core';
import { PoDisclaimer } from '@portinari/portinari-ui';
import { DefaultDateViewConverterService } from 'totvs-log-base-foundation';
import { GlobalService } from 'totvs-log-web-foundation';
import { convertISODateToLocalDate } from '../utils/utils';

type formatFn = (value: any) => string;

export interface IDisclaimerParamsConfig {
  /**
   * Nome do campo no objeto ao qual se deseja aplicar o filtro
   */
  param: string;
  /**
   * Literal opcional para construir o label do disclaimer
   * quando não for utilizar o próprio nome do parâmetro
   */
  literal?: string;
  /**
   * Nome do campo para ser utilizado na montagem do label
   * quando não for utilizar o próprio valor do parâmetro
   * Quando o valor for do tipo Array esta informação será ignorada
   */
  displayValue?: string;
  /**
   * Formatador customizado a ser aplicado para exibição do valor.
   * Padrão: (value: any) => value.toString()
   * @example
   * (value: number) => ('' + value).padStart(2,'0')
   */
  format?: 'date' | formatFn;
}

@Injectable()
export class DisclaimerGroupHelperService {

  constructor(
    private global: GlobalService,
    private dateConverter: DefaultDateViewConverterService
  ) {
  }

  getDisclaimers(params: any, configs?: Array<IDisclaimerParamsConfig>, igonoreParams?: Array<string>): Array<PoDisclaimer> {
    const disclaimers = [];

    Object.keys(params).forEach(param => {

      if (igonoreParams && igonoreParams.includes(param)) {
        return;
      }

      if (params[param]) {
        if (params[param].hasOwnProperty('length') && params[param].length <= 0) {
          return;
        }
        const config = configs ? configs.find((value) => value.param === param ) : undefined;
        if (params[param] instanceof Array) {
          params[param].forEach(value => {
            disclaimers.push(this.criaDisclaimer(param, value, undefined, config));
          });
        } else {
          const displayValue = (config && config.displayValue) ? config.displayValue : param;
          disclaimers.push(this.criaDisclaimer(param, params[param], params[displayValue], config));
        }
      }
    });
    return disclaimers;
  }

  getFilters(disclaimers: Array<PoDisclaimer>): {[key: string]: any} {
    const filters = {};

    disclaimers.forEach((disclaimer) => {
      if (filters[disclaimer.property]) {
        if (filters[disclaimer.property] instanceof Array) {
          filters[disclaimer.property].push(disclaimer.value);
        } else {
          filters[disclaimer.property] = [ filters[disclaimer.property], disclaimer.value ];
        }
      } else {
        filters[disclaimer.property] = disclaimer.value;
      }
    });

    return filters;
  }

  private criaDisclaimer(property: string, value: any, displayValue?: any, config?: IDisclaimerParamsConfig): PoDisclaimer {
    const literal = (config && config.literal) ? config.literal : property;
    const format = (config && config.format) ? config.format : undefined;
    let label =  this.global.i18n.literals[literal] + ': ';
    if (format) {
      if (format === 'date') {
        label += this.dateConverter.toView(convertISODateToLocalDate(value), this.global.i18n.literals.dateFormat);
      } else {
        label += format.call(this, value);
      }
    } else {
      label += displayValue ? displayValue.toString() : value.toString();
    }
    return {
      label,
      property,
      value,
    };
  }
}
