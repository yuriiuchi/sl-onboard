import { Component, EventEmitter, Input, Output, Optional } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';

@Component({
  selector: 'app-novo-label-input',
  templateUrl: './novo-label-input.component.html',
  styleUrls: ['./novo-label-input.component.css']
})
export class NovoLabelInputComponent {

  @Input() titulo = '';
  @Input() padding = false;

  @Input() opcional = false;
  @Input() opcionalTitulo = 'Optional';

  @Output() abrirModalEvent = new EventEmitter<boolean>();

  constructor(
    public global: GlobalService
  ) { }

  solicitarAberturaModal() {
    this.abrirModalEvent.emit(true);
  }
}
