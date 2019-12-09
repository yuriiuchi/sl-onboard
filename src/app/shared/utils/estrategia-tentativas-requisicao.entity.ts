import { ITentativaRequisicao } from './tentativa-requisicao.interface';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

// https://github.com/btroncone/learn-rxjs/blob/master/operators/error_handling/retrywhen.md
export class EstrategiaTentativasRequisicao {

  public static tentativaRequisicaoPadrao(): ITentativaRequisicao {
    return {
      maximoTentativas: 3,
      intervaloTentativa: 3000,
      codigosRespostaDesconsiderados: []
    };
  }

  public static retryWhen = (tentativaRequisicao?: ITentativaRequisicao) => (attempts: Observable<any>) => {
    if (!tentativaRequisicao) {
      tentativaRequisicao = EstrategiaTentativasRequisicao.tentativaRequisicaoPadrao();
    }
    return attempts.pipe(
      mergeMap((error, i) => {
        const retryAttempt = i + 1;
        // if maximum number of retries have been met
        // or response is a status code we don't wish to retry, throw error
        if (
          retryAttempt > tentativaRequisicao.maximoTentativas ||
          tentativaRequisicao.codigosRespostaDesconsiderados.find(e => e === error.status)
        ) {
          return throwError(error);
        }
        // retry after 1s, 2s, etc...
        return timer(retryAttempt * tentativaRequisicao.intervaloTentativa);
      })
    );
  }
}
