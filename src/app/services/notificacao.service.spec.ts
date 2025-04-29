import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notificacao.service';

describe('NotificacaoService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
