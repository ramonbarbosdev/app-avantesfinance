import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private objetoSubject = new BehaviorSubject<string | null>(this.getStored());

  private getStored(): string | null {
    return sessionStorage.getItem('id_cliente');
  }

  getObjeto(): string | null {
    return this.objetoSubject.value;
  }

  setObjeto(valor: string): void {
    this.objetoSubject.next(valor);
    sessionStorage.setItem('id_cliente', valor);
  }
}
