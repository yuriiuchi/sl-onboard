import { dataService } from './../../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService } from './../../../../src/app/memory/data-service/in-memory-data.service';

import { collectionName, professor } from './professor.mock';

dataService(collectionName, (dbService: InMemoryDataService) => {
    dbService.addReplaceUrl('recebimentoQuery/professores', collectionName);

    professor.forEach(professor => {
        dbService.storeData(collectionName, professor);
    });
});
