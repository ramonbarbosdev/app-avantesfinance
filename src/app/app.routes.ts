import { Routes } from '@angular/router';
import { Principal } from './pages/layout/principal/principal';
import { Home } from './pages/home/home';
import { Login } from './pages/layout/login/login';
import { authGuard } from './auth/auth.guard';
import { Conta } from './pages/config/conta/conta';
import { Ajustes } from './pages/config/ajustes/ajustes';
import { Lancamentoform } from './pages/lancamento/lancamentoform/lancamentoform';
import { Lancamentolist } from './pages/lancamento/lancamentolist/lancamentolist';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'admin',
    component: Principal,
    canActivateChild: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'ajustes', component: Ajustes },
      { path: 'conta', component: Conta },
      { path: 'lancamento', component: Lancamentolist },
      { path: 'lancamentoform/:id', component: Lancamentoform }
      
    ],
  },
];
