import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private apiUrl = 'http://localhost:8081/vagas/listar';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  getVagas(): Observable<any[]> {
    const token = this.getToken();  // Pega o token do localStorage

    // Se não houver token, o cabeçalho pode ser omitido ou retornado um erro
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(this.apiUrl, { headers });  // Adiciona o cabeçalho com o token
  }
}
