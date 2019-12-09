import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export class DeAteFormValidator {

  private controleDeNumerico: string;
  private controleAteNumerico: string;
  private controleDeTexto: string;
  private controleAteTexto: string;
  private controlePrefixo: string;

  public static deAteTextoPrefixo(
    nomeControleDe: string,
    nomeControleAte: string,
    nomeControlePrefixo: string
  ): ValidatorFn {
    return new DeAteFormValidator(
      `${nomeControleDe}Numerico`,
      `${nomeControleAte}Numerico`,
      `${nomeControleDe}Texto`,
      `${nomeControleAte}Texto`,
      `${nomeControlePrefixo}`
    ).deAteTextoPrefixoValidator;
  }

  public static deAteNumerico(
    nomeControleDe: string,
    nomeControleAte: string
  ): ValidatorFn {
    return new DeAteFormValidator(
      `${nomeControleDe}`,
      `${nomeControleAte}`
    ).deAteNumericoValidator;
  }

  private deAteTextoPrefixoValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    const usaPrefixo = control.get(this.controlePrefixo).value;

    let controleDe: string;
    let controleAte: string;
    let deAteValido = true;
    let deAteMesmoTamanho = true;

    if (usaPrefixo) {

      controleDe = this.controleDeNumerico;
      controleAte = this.controleAteNumerico;

      deAteValido = this.deAteNumericoEstaValido(
        control,
        controleDe,
        controleAte
      );
    } else {

      controleDe = this.controleDeTexto;
      controleAte = this.controleAteTexto;

      deAteMesmoTamanho = this.deAteTextoTemMesmoTamanho(
        control,
        controleDe,
        controleAte
      );

      if (deAteMesmoTamanho) {
        deAteValido = this.deAteTextoEstaValido(
          control,
          controleDe,
          controleAte
        );
      } else {
        deAteValido = deAteMesmoTamanho;
      }
    }

    if (deAteValido === null) {
      return null;
    }

    if (deAteValido) {
      control.get(controleDe).setErrors(null);
      control.get(controleAte).setErrors(null);
    } else {
      control.get(controleDe).setErrors({ valorDeAte: true });
      control.get(controleAte).setErrors({ valorDeAte: true });
    }

    return deAteMesmoTamanho ? (deAteValido ? null : { valorDeAte: true }) : { tamanhoDeAte: true };
  }

  private deAteNumericoValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    const controleDe = this.controleDeNumerico;
    const controleAte = this.controleAteNumerico;

    const deAteValido = this.deAteNumericoEstaValido(
      control,
      controleDe,
      controleAte
    );

    if (deAteValido === null) {
      return null;
    }

    if (deAteValido) {
      control.get(controleDe).setErrors(null);
      control.get(controleAte).setErrors(null);
    } else {
      control.get(controleDe).setErrors({ valorDeAte: true });
      control.get(controleAte).setErrors({ valorDeAte: true });
    }

    return deAteValido ? null : { valorDeAte: true };
  }

  private constructor(
    controleDeNumerico: string,
    controleAteNumerico: string,
    controleDeTexto?: string,
    controleAteTexto?: string,
    controlePrefixo?: string
  ) {
    this.controleDeNumerico = controleDeNumerico;
    this.controleAteNumerico = controleAteNumerico;
    this.controleDeTexto = controleDeTexto;
    this.controleAteTexto = controleAteTexto;
    this.controlePrefixo = controlePrefixo;
  }

  private deAteNumericoEstaValido(control: FormGroup, controleDe: string, controleAte: string): boolean {

    const valorDe = control.get(controleDe).value;
    const valorAte = control.get(controleAte).value;

    if (
      valorDe === null ||
      valorDe === '' ||
      valorAte === null ||
      valorAte === ''
    ) {
      return null;
    } else {
      return (valorDe <= valorAte);
    }
  }

  private deAteTextoTemMesmoTamanho(control: FormGroup, controleDe: string, controleAte: string): boolean {

    const valorDe = control.get(controleDe).value;
    const valorAte = control.get(controleAte).value;

    if (
      valorDe === null ||
      valorDe.trim() === '' ||
      valorAte === null ||
      valorAte.trim() === '' ||
      !this.temApenasNumerosOuApenasLetras(valorDe) ||
      !this.temApenasNumerosOuApenasLetras(valorAte)) {
      return null;
    } else if (
      !this.temSomenteNumero(valorDe) &&
      !this.temSomenteNumero(valorAte) &&
      valorDe.length !== valorAte.length
    ) {
      return false;
    }

    return true;
  }

  private deAteTextoEstaValido(control: FormGroup, controleDe: string, controleAte: string): boolean {

    const valorDe = control.get(controleDe).value;
    const valorAte = control.get(controleAte).value;

    return (valorDe.localeCompare(valorAte, 'en', { numeric: true }) <= 0);
  }

  private temSomenteNumero(valor: string): boolean {
    return /^\d+$/.test(valor);
  }

  private temApenasNumerosOuApenasLetras(valor: string): boolean {
    return /^[a-zA-Z]*$|^[0-9]*$/.test(valor);
  }
}
