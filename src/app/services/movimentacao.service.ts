import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  private readonly apiUrl = `${environment.apiUrl}/movimentacao`;

  constructor(private http: HttpClient) {}

    findAll(): Observable<any> {
      const url = `${this.apiUrl}/`;
  
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


