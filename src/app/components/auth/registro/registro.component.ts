import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  erro = '';


  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    const usuario = {
      nomeUsuario: this.nome,
      username: this.email,
      password: this.senha,
    };

    this.authService.registrarUsuario(usuario).subscribe({
      next: () => {
        // Exibindo o SweetAlert após o cadastro com sucesso
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          text: 'Você será redirecionado para a página de login.',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirecionando para a página de login após o clique no botão "Confirmar"
            this.router.navigate(['/login']);
          }
        });
      },
      error: (err) => {
        this.erro = err.error?.message || 'Erro ao registrar usuário.';
      },
    });
  }
}
