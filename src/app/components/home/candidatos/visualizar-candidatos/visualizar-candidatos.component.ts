import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidaturasService } from '../../../../services/candidatura/candidaturas.service';
import { CabecalhoComponent } from "../../menu/cabecalho/cabecalho.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualizar-candidatos',
  imports: [CabecalhoComponent, FormsModule, CommonModule],
  templateUrl: './visualizar-candidatos.component.html',
  styleUrl: './visualizar-candidatos.component.css'
})
export class VisualizarCandidatosComponent implements OnInit {

  vagaId!: number;
  candidaturas: any[] = [];
  candidaturasFiltradas: any[] = []; 
  statusFiltro: string = '';

  constructor(private route: ActivatedRoute, private candidaturaService: CandidaturasService) { }

  ngOnInit() {
    this.vagaId = +this.route.snapshot.paramMap.get('vagaId')!;

    this.candidaturaService.buscarCandidatosPorVaga(this.vagaId).subscribe((data: any[]) => {
      this.candidaturas = data;
      this.filtrarCandidatos();
    });

  }

  filtrarCandidatos(): void {
    if (this.statusFiltro === '') {
      this.candidaturasFiltradas = [...this.candidaturas];
    } else {
      this.candidaturasFiltradas = this.candidaturas.filter(c => c.status === this.statusFiltro);
    }
  }

  salvarFeedback(candidato: any) {
    const feedback = candidato.tempFeedback; 
    const novoStatus = candidato.tempStatus; 
    const idUsuario = candidato.usuario.id;
  
    this.candidaturaService.enviarFeedback(this.vagaId, feedback, novoStatus, idUsuario).subscribe(() => {

      candidato.feedback = feedback;
      candidato.status = novoStatus;

      Swal.fire({
        icon: 'success',
        title: 'Feedback enviado!',
        text: 'O feedback foi enviado com sucesso.',
        confirmButtonText: 'Ok'
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro!',
        text: 'Não foi possível enviar o feedback.',
        confirmButtonText: 'Ok'
      });
    });
  }
}
