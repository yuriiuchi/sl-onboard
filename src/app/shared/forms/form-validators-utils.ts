import { ValidatorFn, AbstractControl, ValidationErrors, FormControl, FormArray } from '@angular/forms';

export class FormValidatorsUtils {

  public static textoNaoVazio: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    const valor = control.value as string;
    if (
      !valor ||
      valor.startsWith(' ') ||
      valor.endsWith(' ') ||
      valor.trim() === '') {
      return { textoNaoVazio: true };
    } else {
      return null;
    }
  }

  public static aoMenosUmSwitchMarcado = (nomeControleArray: string, nomePropriedadeSwitch: string): ValidatorFn => {
    return (control: FormControl): ValidationErrors | null => {
      const formArray = control.get(nomeControleArray) as FormArray;
      const estaValido = formArray.controls.some((controle) =>
        controle.get(nomePropriedadeSwitch).value
      );
      return estaValido ? null : { nenhumSwitchMarcado: true };
    };
  }
}
