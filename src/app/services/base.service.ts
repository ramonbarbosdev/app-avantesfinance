import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  findSequence(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/sequencia`;

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

  findSequenceDetalhe(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/sequencia-detalhe/${id}`;

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

  findAll(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;

    return this.http.get<any>(url).pipe(
      tap((res) => {
        return res;
      }),
      catchError((e) => {
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

  findById(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

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

  createMestreDetalhe(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/cadastrar`;

    return this.http.post<any>(url, data).pipe(
      tap((res) => {
        toast('Salvo com sucesso!', {
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

  create(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;

    return this.http.post<any>(url, data).pipe(
      tap((res) => {
        toast('Salvo com sucesso!', {
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
  

  deleteById(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}/${id}`;

    return this.http.delete<any>(url).pipe(
      tap((res) => {
        toast(res.message, {
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
        return res;
      }),
      catchError((e) => {
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
}
