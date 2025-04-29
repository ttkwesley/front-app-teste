import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CabecalhoComponent } from "../../menu/cabecalho/cabecalho.component";
import { CandidaturasService } from '../../../../services/candidatura/candidaturas.service';

@Component({
  selector: 'app-vagas-candidato',
  imports: [CommonModule, CabecalhoComponent, FormsModule],
  templateUrl: './vagas-candidato.component.html',
  styleUrl: './vagas-candidato.component.css'
})
export class VagasCandidatoComponent implements OnInit {
  vagasCandidatadas: any[] = [];
  vagaSelecionada: any = null;
  vagasFiltradas: any[] = []; 
  statusFiltro: string = '';


  constructor(private candidaturaService: CandidaturasService) { }

  ngOnInit(): void {
    const usuarioId = parseInt(localStorage.getItem('idUsuario') || '', 10);

    if (!usuarioId) {
      console.error('Usuário não encontrado');
      return;
    }

    this.candidaturaService.getCandidaturasPorUsuario(usuarioId).subscribe({
      next: (vagas: any[]) => {
        this.vagasCandidatadas = vagas;
        this.filtrarVagas();  
        if (this.vagasCandidatadas.length > 0) {
          this.vagaSelecionada = this.vagasCandidatadas[0];
        }
      },
      error: (err: any) => {
        console.error('Erro ao buscar candidaturas:', err);
      }
    });
  }

  filtrarVagas(): void {
    if (this.statusFiltro === '') {
      this.vagasFiltradas = [...this.vagasCandidatadas];  
    } else {
      this.vagasFiltradas = this.vagasCandidatadas.filter(v => v.status === this.statusFiltro);
    }
  }

  selecionarVaga(vaga: any): void {
    this.vagaSelecionada = vaga;
  }
}
