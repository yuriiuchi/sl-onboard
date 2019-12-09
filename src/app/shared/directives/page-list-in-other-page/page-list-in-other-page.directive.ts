import { Directive, OnInit, ElementRef, Renderer2, ViewChild, Host, AfterViewInit, Optional } from '@angular/core';
import { PoPageListComponent } from '@portinari/portinari-ui';
import { PoPageDynamicSearchComponent } from '@portinari/portinari-templates';

@Directive({
  selector: '[appPageListOtherPage]'
})
export class PageListInOtherPageDirective implements AfterViewInit {

  private parent: HTMLElement;
  private pageHeader: HTMLElement;
  // private pageContent: HTMLElement;

  constructor(
    @Host() @Optional() private pageList: PoPageListComponent,
    @Host() @Optional() private pageSearch: PoPageDynamicSearchComponent,
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  public ngAfterViewInit() {
    this.parent = this.el.nativeElement.parentElement;
    const page = (this.el.nativeElement as HTMLElement).querySelector('div.po-page');
    this.pageHeader = (this.el.nativeElement as HTMLElement).querySelector('div.po-page-header');
    // this.pageContent = (this.el.nativeElement as HTMLElement).querySelector('div.po-page-content');
    this.renderer.setStyle(page, 'margin', '0');
    this.renderer.setStyle(page, 'width', '100%');
    this.renderer.setStyle(page, 'height', 'auto');
    this.renderer.setStyle(this.pageHeader, 'padding-top', '8px');
    // this.renderer.setStyle(this.pageContent, 'padding', '8px 0 0 0');
    if (this.pageList) {
      this.pageList.poPageContent.setHeightContent = this.setHeightContent.bind(this);
    }
  }

  private setHeightContent() {
    const bodyHeight = this.parent.offsetHeight;
    const pageHeaderHeight = this.pageHeader ? this.pageHeader.offsetTop + this.pageHeader.offsetHeight : 0;
    const newHeight = bodyHeight - pageHeaderHeight;

    this.pageList.poPageContent.height = `${newHeight}px`;
  }
}
