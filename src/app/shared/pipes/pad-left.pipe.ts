import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padLeft'
})
export class PadLeftPipe implements PipeTransform {
  transform(value: number | string, char?: string, times?: number): any {
    if (value || value === 0) {
      return ('' + value).padStart(times || 0, char || ' ');
    }
    return null;
  }
}
