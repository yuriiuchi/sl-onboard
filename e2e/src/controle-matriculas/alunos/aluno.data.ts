import { dataService } from './../../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService } from './../../../../src/app/memory/data-service/in-memory-data.service';

import { collectionName, alunos } from './aluno.mock';
import { IAlunoGetAll } from './../../../../src/app/controle-matricula/aluno/entities/aluno-get-all.interface';

dataService(collectionName, (dbService: InMemoryDataService) => {
    dbService.addReplaceUrl('recebimento/alunos', collectionName);
    dbService.addReplaceUrl('recebimentoQuery/alunos', collectionName);

    alunos.forEach(aluno => {
        dbService.storeData(collectionName, aluno);
    });
});
