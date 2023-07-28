import { TestBed } from '@angular/core/testing';

import { FormasPagamentoListService } from './formas-pagamento-list.service';

describe('FormasPagamentoListService', () => {
  let service: FormasPagamentoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormasPagamentoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
