import { EnumPipe } from './enum.pipe';
import { GlobalServiceMock } from 'src/app/mocks/fnd-test-module/services/global/global.service.mock';
import { configureTestSuite } from 'totvs-log-base-foundation';
import { TestBed } from '@angular/core/testing';
import { FndTestModule } from 'src/app/mocks/fnd-test-module/fnd-test.module.mock';
import { GlobalService } from 'totvs-log-web-foundation';

describe('EnumPipe', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FndTestModule
      ],
      providers: [
      ]
    });
  });
  it('create an instance', () => {
    const pipe = new EnumPipe(TestBed.get(GlobalService));
    expect(pipe).toBeTruthy();
  });
});
