import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { VagasEmpregoComponent } from './components/home/vagas-emprego/vagas-emprego.component';
import { CabecalhoComponent } from './components/home/menu/cabecalho/cabecalho.component';
import { CadastroVagaComponent } from './components/home/cadastro-vaga/cadastro-vaga.component';
import { VagasCandidatoComponent } from './components/home/minhas-vaga/vagas-candidato/vagas-candidato.component';
import { VisualizarCandidatosComponent } from './components/home/candidatos/visualizar-candidatos/visualizar-candidatos.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: VagasEmpregoComponent, canActivate: [AuthGuard] },
    { path: 'cadastrar-vaga', component: CadastroVagaComponent, canActivate: [AuthGuard] },
    { path: 'vagas-candidato', component: VagasCandidatoComponent, canActivate: [AuthGuard] },
    { path: 'visualizar-candidatos/:vagaId', component: VisualizarCandidatosComponent, canActivate: [AuthGuard] },

    { path: 'registro', component: RegistroComponent },
    { path: 'cabecalho', component: CabecalhoComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
