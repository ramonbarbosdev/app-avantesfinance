import { TestBed } from '@angular/core/testing';

import { TransacaoContaService } from './transacao-conta.service';

describe('TransacaoContaService', () => {
  let service: TransacaoContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransacaoContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
