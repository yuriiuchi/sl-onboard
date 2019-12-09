import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageListInOtherPageDirective } from './page-list-in-other-page.directive';

@NgModule({
  declarations: [PageListInOtherPageDirective],
  imports: [
    CommonModule
  ],
  exports: [PageListInOtherPageDirective],

})
export class PageListInOtherPageModule { }
