import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  private readonly apiUrl = `${environment.apiUrl}/item-pluggy`;

  constructor(private http: HttpClient) {}

  findAll(endpoint: string): Observable<any> {
      const url = `${environment.apiUrl}/${endpoint}`;
  
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
