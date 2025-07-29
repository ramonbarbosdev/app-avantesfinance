import { Routes } from '@angular/router';
import { Principal } from './pages/layout/principal/principal';
import { Home } from './pages/home/home';
import { Login } from './pages/layout/login/login';
import { authGuard } from './auth/auth.guard';
import { Conta } from './pages/config/conta/conta';
import { Ajustes } from './pages/config/ajustes/ajustes';
import { Lancamentoform } from './pages/lancamento/lancamentoform/lancamentoform';
import { Lancamentolist } from './pages/lancamento/lancamentolist/lancamentolist';
import { Perfil } from './pages/config/perfil/perfil';
import { Relatoriolist } from './pages/relatorios/relatoriolist/relatoriolist';
import { Emprestimolist } from './pages/emprestimo/emprestimolist/emprestimolist';
import { Emprestimoform } from './pages/emprestimo/emprestimoform/emprestimoform';
import { Competencia } from './pages/config/competencia/competencia';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'client',
    component: Principal,
    canActivateChild: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'ajustes', component: Ajustes },
      { path: 'perfil', component: Perfil },
      { path: 'conta', component: Conta },
      { path: 'lancamento', component: Lancamentolist },
      { path: 'lancamentoform/:id', component: Lancamentoform },
      { path: 'lancamentoform', component: Lancamentoform },
      { path: 'relatorios', component: Relatoriolist },
      { path: 'emprestimo', component: Emprestimolist },
      { path: 'emprestimoform/:id', component: Emprestimoform },
      { path: 'competencia', component: Competencia },
    ],
  },
];
