import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly apiUrl = `${environment.apiUrl}/lancamento`;

  constructor(private http: HttpClient) {}

  findSequenceDetalhe(id: number): Observable<any> {
    const url = `${this.apiUrl}/sequencia-detalhe/${id}`;

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


 

  findByCentroCustoByMes(
    id_centrocusto: number,
    dt_anomes: string
  ): Observable<any> {
    const url = `${this.apiUrl}/lancamento-existente/${id_centrocusto}/${dt_anomes}`;

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

  create(data: any): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;

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

  update(data: any): Observable<any> {
    const url = `${this.apiUrl}/atualizar`;

    return this.http.put<any>(url, data).pipe(
      tap((res) => {
        toast('Atualizado com sucesso!', {
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

 
}
