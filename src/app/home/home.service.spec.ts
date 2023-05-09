import { TestBed } from '@angular/core/testing';

import { JogoService } from '../service/jogo.service';

describe('HomeService', () => {
  let service: JogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
