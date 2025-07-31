import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private reloadSubject = new Subject<void>();
  itemReload$ = this.reloadSubject.asObservable();

  emitItemReload() {
    this.reloadSubject.next();
  }

  private userSubject = new Subject<{
    id_usuario: number;
    id_cliente: number;
    role: string;
  }>();
  userReload$ = this.userSubject.asObservable();

  emitUserReload(id_usuario: number, id_cliente: number, role: string) {
    this.userSubject.next({ id_usuario, id_cliente, role });
  }
}
