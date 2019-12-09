import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PadLeftPipe } from './pad-left.pipe';
import { EnumPipe } from './enum.pipe';



@NgModule({
  declarations: [PadLeftPipe, EnumPipe],
  imports: [
    CommonModule
  ],
  exports: [PadLeftPipe, EnumPipe]
})
export class PipesModule { }
