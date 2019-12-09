import { Pipe, PipeTransform } from '@angular/core';
import { Enum } from '../enum/enum';
import { GlobalService } from 'totvs-log-web-foundation';

@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {
  constructor(private readonly global: GlobalService) {}
  transform(value: Enum<any>): any {
    return this.global.i18n.literals[value.label];
  }

}
