import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VagaService } from '../../../services/vagas/vaga.service';
import { CabecalhoComponent } from "../menu/cabecalho/cabecalho.component";
import { CandidaturasService } from '../../../services/candidatura/candidaturas.service';
import { NotificationService } from '../../../services/notificacao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vagas-emprego',
  imports: [FormsModule, CommonModule, CabecalhoComponent],
  templateUrl: './vagas-emprego.component.html',
  styleUrls: ['./vagas-emprego.component.css']
})
export class VagasEmpregoComponent implements OnInit {
  searchTerm: string = '';
  showNotification: boolean = false;
  notificationMessage: string = '';
  vagaSelecionada: any = null; 
  vagas: any[] = [];
  vagaModal: any = null; 

  constructor(
    private vagaService: VagaService,
    private candidaturaService: CandidaturasService,
    private notificacaoService: NotificationService
  ) { }

  ngOnInit() {
    this.vagaService.getVagas().subscribe(vagas => {
      this.vagas = vagas
        .filter(vaga => vaga.status === true)
        .map(vaga => {
          vaga.requisitosArray = vaga.requisitos.split(', ').map((requisito: string) => requisito.trim());
          return vaga;
        });
    });
  }

  toggleFavorite(vaga: any) {
    vaga.isFavorited = !vaga.isFavorited;
    this.notificationMessage = 'Adicionado aos favoritos';
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }

  candidatar(vaga: any) {
    const usuarioId = parseInt(localStorage.getItem('idUsuario') || '', 10);
    this.candidaturaService.candidatar(usuarioId, vaga.id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Candidatura realizada!',
          text: 'Você se candidatou com sucesso à vaga.',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        const mensagem = `Novo candidato para a vaga: ${vaga.titulo}`;
        this.notificacaoService.sendNotification(vaga.criadoPor, mensagem).subscribe({
          next: (response) => {
            console.log('Notificação enviada com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao enviar notificação', err);
          }
        });

      },
      error: (err) => {
        console.error('Erro ao candidatar:', err);

        if (err.status === 400 || err.status === 409) {
          Swal.fire({
            icon: 'warning',
            title: 'Candidatura já realizada!',
            text: 'Você já se candidatou a esta vaga.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro ao candidatar!',
            text: 'Ocorreu um erro ao tentar se candidatar. Tente novamente.',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      }
    });
  }

  get filteredVagas() {
    return this.vagas.filter(vaga =>
      vaga.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selecionarVaga(vaga: any) {
    this.vagaSelecionada = vaga;
  }

    abrirModal(vaga: any) {
      this.vagaModal = vaga;
    }
  
    fecharModal() {
      this.vagaModal = null;
    }
}
