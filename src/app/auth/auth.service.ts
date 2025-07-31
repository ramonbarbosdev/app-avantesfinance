import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environment';
import Swal from 'sweetalert2';
import { toast } from 'ngx-sonner';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}`;

  private router = inject(Router);
  constructor(private http: HttpClient) {}

  findByUsuarioByCliente(id_usuario: number, id_cliente: number): Observable<any> {
    const url = `${this.apiUrl}/cliente/obter-usuario-logado/${id_usuario}/${id_cliente}`;

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        console.log(e);
        toast(e.error.message, {
          description: e.error.codeDescription,
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
        return throwError(() => e);
      })
    );
  }
  findByLogin(login: string): Observable<any> {
    const url = `${this.apiUrl}/cliente/obter-cliente-usuario/${login}`;

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        console.log(e);
        toast(e.error.message, {
          description: e.error.codeDescription,
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
        return throwError(() => e);
      })
    );
  }

  updateUser(data: any): Observable<any> {
    const url = `${this.apiUrl}/usuario/perfil/`;

    return this.http.post<any>(url, data).pipe(
      tap((res) => {
        toast(res.message, {
          description: '',
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
        return res;
      }),
      catchError((e) => {
        console.log(e);
        toast(e.error.message, {
          description: e.error.codeDescription,
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
        return throwError(() => e);
      })
    );
  }

  uploadFotoPerfil(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/usuario/${id}/upload-foto`;

    return this.http.post<any>(url, data).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
        console.log(e);
        toast(e.error.message, {
          description: e.error.codeDescription,
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
        return throwError(() => e);
      })
    );
  }

  login(credenciais: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, credenciais, {
      withCredentials: true, // <- permite receber e enviar cookies
    });
  }

  fazerLogout() {
    return this.http.post(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }

  cadastrar(data: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register`;

    return this.http
      .post(url, data)
      .pipe(catchError((error) => throwError(() => error)));
  }

  logout() {
    this.fazerLogout().subscribe({
      next: () => {
        this.clearToken();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro no logout:', err);
        this.clearToken();
        this.router.navigate(['/login']);
      },
    });
  }

  obterChave(id_usuario: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/pluggy/obter-token/${id_usuario}`;
    return this.http
      .get(url, { headers: new HttpHeaders({ Authorization: `${token}` }) })
      .pipe(catchError((error) => throwError(() => error)));
  }

  async setUser(info: any) {
    const retorno = await firstValueFrom(
      this.obterChave(info.id_usuario, info.Authorization)
    );
    let objeto = {
      id_usuario: info.id_usuario,
      id_cliente: info.id_cliente,
      role: info.role,
      login: info.login,
      pluggy: [],
    };
    sessionStorage.setItem('user', JSON.stringify(objeto));

    this.userSubject.next(objeto);
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  clearToken() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('competencia');
    sessionStorage.removeItem('id_cliente');
  }

  getUser() {
    let user = sessionStorage.getItem('user');
    let objeto = user !== null ? JSON.parse(user) : null;
    return objeto;
  }

  getUserSubbject() {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getHeaders() {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `${token}`,
    });
  }

  private userSubject = new BehaviorSubject<any | null>(null);
  user$ = this.userSubject.asObservable();
}
