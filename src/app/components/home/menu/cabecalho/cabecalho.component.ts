import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../services/notificacao.service';

@Component({
  selector: 'app-cabecalho',
  imports: [CommonModule, FormsModule],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {
  notifications: any[] = []; 
  notificationsVisible: boolean = false; 
  menuOpen = false;  
  nomeUsuario: string = localStorage.getItem('nomeUsuario') || "";
  private role: any =  localStorage.getItem('role');

  constructor(private notificacaoService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  isUserAdmin(): boolean {
    return this.role?.includes('ADM')
  }

  loadNotifications() {
    this.notificacaoService.getNotification().subscribe((notificacoes) => {
      this.notifications = notificacoes;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; 
  }

  toggleNotifications() {
    this.notificationsVisible = !this.notificationsVisible;
  }

  marcarComoLida(index: number) {
    this.notifications.splice(index, 1); 
  }

  userMenuOpen = false;

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    console.log('userMenuOpen:', this.userMenuOpen); // Verifique se o valor está mudando

  }

  logout() {
    localStorage.clear();
    window.location.href = '/login'; 
  }
}
