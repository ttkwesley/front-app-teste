import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})

export class LoginComponent {
  username: string = ''; 
  password: string = ''; 

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    const loginData = {
      username: this.username, 
      password: this.password
    }; 
  
    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login realizado com sucesso', response); 
        localStorage.setItem('token', response.token); 
        localStorage.setItem('idUsuario', response.idUsuario)
        localStorage.setItem('userName', this.username)
        localStorage.setItem('nomeUsuario', response.nomeUsuario)
        localStorage.setItem('role', response.role) 
        this.router.navigate(['/home']); 
      }, 
      error: (error) => {
        console.error('Erro no login', error); 
        alert('Email ou senha inválidos!');
      }
    });
  }
}
