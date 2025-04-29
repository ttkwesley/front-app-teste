import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VagasCadastroService {
  private apiUrl = 'http://localhost:8081/vagas'; 
  private token: string | null = localStorage.getItem('token');  

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Se o token estiver presente, ele será adicionado ao cabeçalho
    const headers = this.token ? new HttpHeaders().set('Authorization', `Bearer ${this.token}`) : new HttpHeaders();
    return headers;
  }

  cadastrarVaga(vaga: any): Observable<any> {
    const headers = this.getHeaders(); 
    return this.http.post<any>(`${this.apiUrl}/cadastrar`, vaga, { headers });
  }

  listarVagas(): Observable<any[]> {
    const headers = this.getHeaders();  
    return this.http.get<any[]>(`${this.apiUrl}/listar`, { headers });
  }

  removerVaga(id: number): Observable<void> {
    const headers = this.getHeaders();  
    return this.http.post<void>(`${this.apiUrl}/remover/${id}`, null, { headers });
  }

  editarVaga(id: number, vaga:any): Observable<void> {
    const headers = this.getHeaders();  
    return this.http.post<void>(`${this.apiUrl}/editar/${id}`, vaga, { headers });
  }
}
