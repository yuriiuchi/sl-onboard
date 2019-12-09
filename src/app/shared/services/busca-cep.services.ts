import { HttpEvent, HttpRequest, HttpResponse, HttpXhrBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';


@Injectable()
export class ConsultaCepService {

  constructor(private backend: HttpXhrBackend) { }

  consultaCEP(cep: string): Promise<any> {
    /** Nova variável "cep" somente com dígitos. */
    cep = cep.replace(/\D/g, '');
    /** Expressão regular para validar o CEP */
    const validacep = /^[0-9]{8}$/;
    /** Valida o formato do CEP. */
    if (validacep.test(cep)) {
      const request = new HttpRequest('GET', `//viacep.com.br/ws/${cep}/json/`);

      const events$: Observable<HttpEvent<any>> =
        of(request).pipe(concatMap((req: HttpRequest<any>) => this.backend.handle(req)));

      // Filtra apenas o evento de resposta
      const res$: Observable<HttpResponse<any>> = events$.pipe(
        filter((event: HttpEvent<any>) => event instanceof HttpResponse)) as Observable<HttpResponse<any>>;

      return res$.pipe(map((res: HttpResponse<any>) => res.body)).toPromise();
    } else {
      return Promise.reject(cep);
    }
  }
}
