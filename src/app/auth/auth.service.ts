import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}`;

  private router = inject(Router);
  constructor(private http: HttpClient) { }

  login(credenciais: { login: string; senha: string }) {
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

  obterChave(id_usuario: string, token: string) {

    const url = `${this.apiUrl}/pluggy/obter-token/${id_usuario}`;
    return this.http
      .get(url, { headers:new HttpHeaders({ Authorization: `${token}`}),})
      .pipe(catchError((error) => throwError(() => error)));
  }

   async setUser(info: any) {
     const apiKey = await firstValueFrom(this.obterChave(info.id_usuario, info.Authorization));

    let objeto = {
      id_usuario: info.id_usuario,
      nm_usuario: info.nm_usuario,
      login: info.login,
      apiKey: apiKey
    };
    sessionStorage.setItem('user', JSON.stringify(objeto));
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
  }

 

  getUser() {
    let user = sessionStorage.getItem('user');
    let objeto = user !== null ? JSON.parse(user) : null;
    return objeto;
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
}
