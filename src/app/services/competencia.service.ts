import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompetenciaService {
  private competenciaSubject = new BehaviorSubject<string | null>(
    this.getStoredCompetencia()
  );
  competencia$ = this.competenciaSubject.asObservable();

  private getStoredCompetencia(): string | null {
    return sessionStorage.getItem('competencia');
  }

  getCompetencia(): string | null {
    return this.competenciaSubject.value;
  }

  setCompetencia(valor: string): void {
    this.competenciaSubject.next(valor);
    sessionStorage.setItem('competencia', valor);
  }
}
