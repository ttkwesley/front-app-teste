import { TestBed } from '@angular/core/testing';

import { VagasCadastroService } from './vagas-cadastro.service';

describe('VagasCadastroService', () => {
  let service: VagasCadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VagasCadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
