import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoModule } from '@portinari/portinari-ui';

import { GlobalService } from 'totvs-log-web-foundation';
import { configureTestSuite } from 'totvs-log-base-foundation';

import { NovoLabelInputComponent } from './novo-label-input.component';
import { GlobalServiceMock } from './../../../mocks/fnd-test-module/services/global/global.service.mock';



describe('novo-label-input.component.spec | NovoLabelInputComponent', () => {
  let component: NovoLabelInputComponent;
  let fixture: ComponentFixture<NovoLabelInputComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoLabelInputComponent ],
      providers: [
        {
          provide: GlobalService,
          useClass: GlobalServiceMock
        }
      ],
      imports: [
        PoModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoLabelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir evento', () => {
    const spy = spyOn(component.abrirModalEvent, 'emit');
    component.solicitarAberturaModal();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
