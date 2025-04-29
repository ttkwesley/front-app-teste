import { Component, OnInit } from '@angular/core';
import { VagasCadastroService } from '../../../services/vagas/vagas-cadastro.service';
import { CabecalhoComponent } from "../menu/cabecalho/cabecalho.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-cadastro-vaga',
  imports: [CabecalhoComponent, CommonModule, FormsModule],
  templateUrl: './cadastro-vaga.component.html',
  styleUrls: ['./cadastro-vaga.component.css'] 
})
export class CadastroVagaComponent implements OnInit {
  vaga: any = {
    titulo: '',
    descricao: '',
    requisitos: ''
  };

  vagas: any[] = [];
  showNotification = false; 
  notificationMessage = '';  

  constructor(private vagaCadastroService: VagasCadastroService, private router: Router) {}

  ngOnInit() {
    this.buscarVagas();
  }

  onSubmit() {
    this.vagaCadastroService.cadastrarVaga(this.vaga).subscribe({
      next: (vagaCadastrada: any) => {  
        this.vagas.push(vagaCadastrada);
        this.vaga = { titulo: '', descricao: '', requisitos: '' }; 
        this.showNotification = true;  
        this.notificationMessage = 'Vaga cadastrada com sucesso!';  
        setTimeout(() => {
          this.showNotification = false;  
        }, 3000);
      },
      error: (err: any) => { 
        console.error('Erro ao cadastrar vaga', err);
      }
    });
  }

  

  buscarVagas() {
    this.vagaCadastroService.listarVagas().subscribe({
      next: (vagas: any[]) => {  
        this.vagas = vagas
        .filter(vaga => vaga.status === true && vaga.criadoPor === localStorage.getItem('userName'));
      },
      error: (err: any) => {  
        console.error('Erro ao buscar vagas', err);
      }
    });
  }
  
  vagaEditando: any = null; 
  mostrarModalEdicao: boolean = false;

  editarVaga(vaga: any) {
    this.vagaEditando = { ...vaga };
    this.mostrarModalEdicao = true;
  }

  salvarEdicao() {
    if (this.vagaEditando) {
      this.vagaCadastroService.editarVaga(this.vagaEditando.id, this.vagaEditando).subscribe({
        next: () => {
          this.vagas = this.vagas.map(v => v.id === this.vagaEditando.id ? { ...this.vagaEditando } : v);
          this.fecharModal();
          Swal.fire('Vaga editada com sucesso!', '', 'success');
        },
        error: (err: any) => {
          console.error('Erro ao editar vaga', err);
          Swal.fire('Erro ao editar vaga', 'Tente novamente mais tarde.', 'error');
        }
      });
    }
  }
  
  fecharModal() {
    this.mostrarModalEdicao = false;
    this.vagaEditando = null;
  }

  visualizarCandidatos(vaga: any) {
    this.router.navigate(['/visualizar-candidatos', vaga.id]);
  }

  removerVaga(vaga: any) {
    Swal.fire({
      title: 'Tem certeza que deseja remover esta vaga?',
      text: 'Esta ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vagaCadastroService.removerVaga(vaga.id).subscribe({
          next: (response: any) => {
            this.vagas = this.vagas.filter(v => v.id !== vaga.id);
            
            Swal.fire({
              title: 'Vaga removida com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          error: (err: any) => {
            console.error('Erro ao remover vaga', err);
            
            Swal.fire({
              title: 'Erro ao remover vaga!',
              text: 'Houve um problema ao tentar remover a vaga.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    });
  }
  
}
