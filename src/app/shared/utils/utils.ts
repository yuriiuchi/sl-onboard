import { AbstractControl } from '@angular/forms';

export function isArray(value: any) {
    return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}

const strCaretTrap = '[]';
export function processCaretTraps(mask: any) {
    const indexes = [];

    const indexOfCaretTrap = mask.indexOf(strCaretTrap);
    while (indexOfCaretTrap !== -1) {
        indexes.push(indexOfCaretTrap);
        mask.splice(indexOfCaretTrap, 1);
    }
    return { maskWithoutCaretTraps: mask, indexes };
}

export function convertToBoolean(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }

  if (typeof val === 'number') {
    return val === 1;
  }

  return !!val;
}

export function isEmptyControlValue(ct: AbstractControl): boolean {
  if (ct.value == null || ct.value.length === 0) {
     return true;
  }
  return false;
}
export function isInvalidNumberValue(ct: AbstractControl): boolean {
  if (ct.value == null || isNaN(ct.value)) {
     return true;
  }
  return false;
}

export function isPositiveNumberValue(ct: AbstractControl): boolean {
  if (!isInvalidNumberValue(ct)) {
    return ct.value > 0;
  }
  return false;
}

export function isEmptyString(value: string): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  return value.trim().length === 0;
}

const milisegundosInMinute = 60000;

export function convertISODateToUTCDate(isoDate: string|Date): Date {
  const values = (typeof isoDate === 'string') ?
                  isoDate.split('-').map( v => parseInt(v, 10)) :
                  [isoDate.getFullYear(), isoDate.getMonth() + 1, isoDate.getDate()];
  const localDate = new Date(Date.UTC(values[0], values[1] - 1, values[2]));
  return localDate;
}

export function convertISODateToLocalDate(isoDate: string|Date): Date {
  let localDate = convertISODateToUTCDate(isoDate);
  const userTimezoneOffset = localDate.getTimezoneOffset() * milisegundosInMinute;
  localDate = new Date(localDate.getTime() + userTimezoneOffset);
  return localDate;
}

export function convertISODateToLocalDateTime(isoDate: string|Date, hours: number, min?: number, sec?: number, ms?: number): Date {
  const localDate = convertISODateToLocalDate(isoDate);
  localDate.setHours((hours ? hours : 0), min, sec, ms);
  return localDate;
}

export function focaInputCampo(campo: string) {
  setTimeout(() => {
    const input: HTMLElement = window.document.querySelector(
      campo
    );
    if (input) {
      input.focus();
    }
  }, 16);
}
