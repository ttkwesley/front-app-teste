import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8081/alert'; 

  constructor(private http: HttpClient) {}

  sendNotification(idUsuario: string, mensagem: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    const body = new URLSearchParams();
    body.set('idUsuario', idUsuario);
    body.set('mensagem', mensagem);

    return this.http.post(`${this.apiUrl}/send`, body.toString(), { headers });
  }

  getNotification(): Observable<any[]> { // <<< usando any[]
    const usuarioId = localStorage.getItem('idUsuario');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}`});

    return this.http.get<any[]>(`${this.apiUrl}/get/${usuarioId}`, { headers }); 
  }
}
