import { Routes } from '@angular/router';
import { Principal } from './pages/layout/principal/principal';
import { Home } from './pages/client/home/home';
import { Login } from './pages/layout/login/login';
import { authGuard } from './auth/auth.guard';
import { Conta } from './pages/config/conta/conta';
import { Ajustes } from './pages/config/ajustes/ajustes';
import { Perfil } from './pages/config/perfil/perfil';
import { Emprestimoform } from './pages/client/emprestimo/emprestimoform/emprestimoform';
import { Competencia } from './pages/config/competencia/competencia';
import { Emprestimolist } from './pages/client/emprestimo/emprestimolist/emprestimolist';
import { Lancamentolist } from './pages/client/lancamento/lancamentolist/lancamentolist';
import { Lancamentoform } from './pages/client/lancamento/lancamentoform/lancamentoform';
import { Relatoriolist } from './pages/client/relatorios/relatoriolist/relatoriolist';
import { Dashboard } from './pages/admin/dashboard/dashboard';
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
  {
    path: 'admin',
    component: Principal,
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },

    ],
  },
];
