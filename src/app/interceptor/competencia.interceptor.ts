import { HttpInterceptorFn } from "@angular/common/http";
import { CompetenciaService } from "../services/competencia.service";
import { inject } from "@angular/core";

export const CompetenciaInterceptor: HttpInterceptorFn = (req, next) => {
  const competenciaService = inject(CompetenciaService);
  const competencia = competenciaService.getCompetencia();

  if (competencia) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Competencia': competencia,
      },
    });
    return next(modifiedReq);
  }

  return next(req);
};
