
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoFieldModule, PoLoadingModule, PoModalModule, PoPopoverModule, PoStepperModule } from '@portinari/portinari-ui';
import { InMemoryDataModule } from '../memory/data-service/in-memory-data.module';

@NgModule({
  declarations: [],
  imports: [
    InMemoryDataModule.forFeature()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoButtonModule,
    PoModalModule,
    PoLoadingModule,
    PoStepperModule,
    PoPopoverModule
  ]
})
export class FormModule { }
