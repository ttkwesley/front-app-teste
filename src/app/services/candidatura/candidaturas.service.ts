import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidaturasService {

  private apiUrl = "http://localhost:8081/candidaturas"; // sem o segundo /candidatar aqui!

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  candidatar(usuarioId: number, vagaId: number) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/candidatar`, null, {
      params: {
        usuarioId: usuarioId.toString(),
        vagaId: vagaId.toString()
      },
      responseType: 'text',
      headers: headers
    });
  }

  buscarCandidatosPorVaga(idVaga: number): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/candidatos/${idVaga}`, { headers });
  }
  
  getCandidaturasPorUsuario(usuarioId: number) {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/listar/${usuarioId}`, { headers: headers });
  }

  buscarVagaPorId(vagaId: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/listar/${vagaId}`, { headers: headers });
  }

  enviarFeedback(idVaga: number, feedback: string, novoStatus: string, idUser: number): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${this.apiUrl}/feedback`, {
      idVaga,
      feedback,
      novoStatus,
      idUser
    }, {
      headers: headers,
    });
  }
}
