import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarCandidatosComponent } from './visualizar-candidatos.component';

describe('VisualizarCandidatosComponent', () => {
  let component: VisualizarCandidatosComponent;
  let fixture: ComponentFixture<VisualizarCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizarCandidatosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
