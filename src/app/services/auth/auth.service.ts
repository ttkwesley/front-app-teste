import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface LoginRequest{
  username: string; 
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8081/auth/login'; 
  private registroUrl = 'http://localhost:8081/user/cadastro'; 

  constructor(private http: HttpClient) { }

  login(dados: LoginRequest): Observable<any> {
    return this.http.post(this.loginUrl, dados); 
  }

  registrarUsuario(dados: any): Observable<any> {
    return this.http.post(this.registroUrl, dados);
  }

}
