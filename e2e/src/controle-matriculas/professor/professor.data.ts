import { dataService } from './../../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService } from './../../../../src/app/memory/data-service/in-memory-data.service';

import { collectionName, professores } from './professor.mock';

dataService(collectionName, (dbService: InMemoryDataService) => {
    dbService.addReplaceUrl('recebimento/professores', collectionName);
    dbService.addReplaceUrl('recebimentoQuery/professores', collectionName);

    professores.forEach( professor => {
        dbService.storeData(collectionName, professor);
    });
});
