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
}
