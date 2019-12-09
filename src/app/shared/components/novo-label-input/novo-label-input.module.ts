import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoModule } from '@portinari/portinari-ui';

import { NovoLabelInputComponent } from './novo-label-input.component';

@NgModule({
  imports: [CommonModule, PoModule],
  entryComponents: [NovoLabelInputComponent],
  declarations: [NovoLabelInputComponent],
  exports: [NovoLabelInputComponent]
})
export class NovoLabelInputModule {}
