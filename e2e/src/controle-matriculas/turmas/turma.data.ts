import { dataService } from './../../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService } from './../../../../src/app/memory/data-service/in-memory-data.service';

import { collectionName, turmas } from './turma.mock';

dataService(collectionName, (dbService: InMemoryDataService) => {
    dbService.addReplaceUrl('recebimentoQuery/turmas', collectionName);

    // dbService.addSearchTermMap(collectionName, ['identificador']);

    // dbService.addFieldFilterMap(collectionName, 'dataEmissaoDe', (value: string, documento: ITurmaGetAll) => {
    //     return new Date(documento.dataEmissao) >= new Date(value + ' 00:00:00 -03');
    // });

    turmas.forEach(turma => {
        dbService.storeData(collectionName, turma);
    });
});
