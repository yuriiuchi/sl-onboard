import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InMemoryDataModule } from '../memory/data-service/in-memory-data.module';
import {
  PoPageModule,
  PoWidgetModule,
  PoPopupModule,
  PoDividerModule,
  PoTagModule,
  PoContainerModule,
  PoInfoModule
} from '@portinari/portinari-ui';

@NgModule({
  declarations: [],
  imports: [
    InMemoryDataModule.forFeature()
  ],
  exports: [
    CommonModule,
    PoPageModule,
    PoWidgetModule,
    PoPopupModule,
    PoDividerModule,
    PoTagModule,
    PoContainerModule,
    PoInfoModule
  ]
})
export class PageModule { }
