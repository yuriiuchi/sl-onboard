import { InMemoryDataService, LoadFn } from './in-memory-data.service';

export const dataServiceFn: Map<string, LoadFn> = new Map();

export function dataService(collectionName: string, loadFn: LoadFn): void {
  dataServiceFn.set(collectionName, loadFn);
}

const dbService = new InMemoryDataService();

export function getDbService(): InMemoryDataService {
  return dbService;
}

export function createDatabase(): Promise<boolean> {
  const result$ = new Promise<boolean>((resolve, reject) => {
    dbService.deleteDatabase().then(() => {
      dbService.createDatabase().then(() => {
        dbService.createObjectStore(dataServiceFn).then(() => {
          resolve(true);
        }, error => {
          console.error(error);
          reject(error);
        });
      }, error => {
        console.error(error);
        reject(error);
      });
    }, error => {
      console.error(error);
      reject(error);
    });
  });
  return result$;
}




