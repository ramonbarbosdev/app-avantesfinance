import { Routes } from '@angular/router';
import { Principal } from './pages/layout/principal/principal';
import { Home } from './pages/home/home';

export const routes: Routes = [

    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    {
        path: 'admin',
        component: Principal,
        canActivateChild: [],
        children: [
            { path: 'home', component: Home },
        ],
    },

];
