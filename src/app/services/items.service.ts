import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly apiUrl = `${environment.apiUrl}/item-pluggy`;

  constructor(private http: HttpClient) {}

  findItemsById(id_item: string, apiKey: string): Observable<any> {
    const url = `${this.apiUrl}/obter-item/${id_item}/${apiKey}`;

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

  findItems(): Observable<any> {
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

  deleteItem(id_item: string, apiKey: string) {
    const url = `${this.apiUrl}/${id_item}/${apiKey}`;

    return this.http.delete<any>(url).pipe(
      tap((res) => {
        toast(res.message, {
          // description: res.codeDescription,
          action: {
            label: 'Ok',
            onClick: () => {},
          },
        });
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

  createItem(objeto: any)
  {
    const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, objeto).pipe(
      tap((res) => {
         toast("Item criado com sucesso", {
           // description: res.codeDescription,
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
