import { dataService } 
    from './../../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService } 
    from './../../../../src/app/memory/data-service/in-memory-data.service';

import { collectionName, aluno } from './aluno.mock';
import { IAlunoGetAll } from './../../../../src/app/controle-matricula/aluno/entities/aluno-get-all.interface';

dataService(collectionName, (dbService: InMemoryDataService) => {
    dbService.addReplaceUrl('recebimentoQuery/alunos', collectionName);

    // dbService.addSearchTermMap(collectionName, ['identificador']);

    // dbService.addFieldFilterMap(collectionName, 'dataEmissaoDe', (value: string, documento: ITurmaGetAll) => {
    //     return new Date(documento.dataEmissao) >= new Date(value + ' 00:00:00 -03');
    // });

    aluno.forEach(aluno => {
        dbService.storeData(collectionName, aluno);
    });
});
