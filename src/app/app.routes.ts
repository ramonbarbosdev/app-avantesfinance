import { Routes } from '@angular/router';
import { Principal } from './pages/layout/principal/principal';
import { Home } from './pages/client/home/home';
import { Login } from './pages/layout/login/login';
import { authGuard } from './auth/auth.guard';
import { Conta } from './pages/config/conta/conta';
import { Ajustes } from './pages/config/ajustes/ajustes';
import { Perfil } from './pages/config/perfil/perfil';
import { Emprestimoform } from './pages/client/emprestimo/emprestimoform/emprestimoform';
import { Emprestimolist } from './pages/client/emprestimo/emprestimolist/emprestimolist';
import { Lancamentolist } from './pages/client/lancamento/lancamentolist/lancamentolist';
import { Lancamentoform } from './pages/client/lancamento/lancamentoform/lancamentoform';
import { Relatoriolist } from './pages/client/relatorios/relatoriolist/relatoriolist';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Usuariolist } from './pages/admin/usuario/usuariolist/usuariolist';
import { Usuarioform } from './pages/admin/usuario/usuarioform/usuarioform';
import { Rolelist } from './pages/admin/role/rolelist/rolelist';
import { Roleform } from './pages/admin/role/roleform/roleform';
import { Clientelist } from './pages/admin/cliente/clientelist/clientelist';
import { Clienteform } from './pages/admin/cliente/clienteform/clienteform';
import { Competencialist } from './pages/config/competencia/competencialist/competencialist';
import { Competenciaform } from './pages/config/competencia/competenciaform/competenciaform';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'client',
    component: Principal,
    canActivateChild: [authGuard],
    data: { roles: ['client'] },
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
      { path: 'competencia', component: Competencialist },
      { path: 'competenciaform/:id', component: Competenciaform },
    ],
  },
  {
    path: 'admin',
    component: Principal,
    canActivateChild: [authGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'usuario', component: Usuariolist },
      { path: 'usuarioform/:id', component: Usuarioform },
      { path: 'role', component: Rolelist },
      { path: 'roleform/:id', component: Roleform },
      { path: 'cliente', component: Clientelist },
      { path: 'clienteform/:id', component: Clienteform },
    ],
  },
];
