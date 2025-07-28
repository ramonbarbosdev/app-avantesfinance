import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private readonly apiUrl = `${environment.apiUrl}/relatorios`;

  constructor(private http: HttpClient) {}

  findAllRelatorio(endpoint:string): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;

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
  findRelatorioById(endpoint:string, id: any): Observable<any> {
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
}
