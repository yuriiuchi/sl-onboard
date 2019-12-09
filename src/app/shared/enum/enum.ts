import { GlobalService } from 'totvs-log-web-foundation';
import { PoRadioGroupOption, PoSelectOption, PoComboOption } from '@portinari/portinari-ui';

export abstract class Enum<T> {
  protected constructor(
    public readonly value: T,
    public readonly label: string,
    public readonly disabled = false
  ) {}

  toRadio(global: GlobalService): PoRadioGroupOption {
    return { value: this.value + '', label: global.i18n.literals[this.label], disabled: this.disabled };
  }
  toCombo(global: GlobalService): PoComboOption {
    return { value: this.value + '', label: global.i18n.literals[this.label] };
  }
  toSelect(global: GlobalService): PoSelectOption {
    return { value: this.value + '', label: global.i18n.literals[this.label] };
  }
  translateLabel(global: GlobalService): string {
    return global.i18n.literals[this.label];
  }
}
