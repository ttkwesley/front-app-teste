import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasCandidatoComponent } from './vagas-candidato.component';

describe('VagasCandidatoComponent', () => {
  let component: VagasCandidatoComponent;
  let fixture: ComponentFixture<VagasCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VagasCandidatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagasCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
