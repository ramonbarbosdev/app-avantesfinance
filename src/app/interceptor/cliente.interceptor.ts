import { HttpInterceptorFn } from "@angular/common/http";
import { CompetenciaService } from "../services/competencia.service";
import { inject } from "@angular/core";
import { ClienteService } from "../services/cliente.service";

export const ClienteInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(ClienteService);
  const objetoSub = service.getObjeto();

  if (objetoSub) {
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Cliente': objetoSub,
      },
    });
    return next(modifiedReq);
  }

  return next(req);
};
