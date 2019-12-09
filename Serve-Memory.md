# WMS Thf in Memory

Este tutorial descreve como utilizar o projeto WMS Thf com um backend simulado durante a execução da aplicação.

## Entendendo o conceito

Para simular um backend é utilizado o recurso de _**IndexDB**_ do _browser_, portanto os dados ficam armazenados temporariamente neste local podendo ser consultados durante a execução na aba _**Aplication**_.
Porém, para o projeto do WMS foi implementado para sempre excluir e recriar o banco de dados ao iniciar a aplicação.

Para auxiliar neste processo de interceptação das requisições e devolver as respostas esperadas foi utilizado a biblioteca: [Angular - in-memory-web-api](https://github.com/angular/in-memory-web-api).

Esta biblioteca foi projetada para trabalhar com aplicações _**RESTful**_ e gravar os dados apenas em memória.
Para o projeto do WMS ela foi estendida através da classe [**InMemoryDataService**](src/app/memory/data-service/in-memory-data.service.ts).

Os dados a serem utilizados devem ficar em arquivos _*.data.ts* que devem ser localizados abaixo da pasta **e2e/src/**.

Estes arquivos são lidos durante o inicio da aplicação pelo arquivo: [main](src/main-mem.ts).

Para utilizar este recurso disponível foram criadas funções de mapeamento que configuram quais são as entidades a serem criadas e persistidas pela classe e como trabalhar com as requisições quando existem algumas particularidades.
Estas funções estão disponíveis no arquivo: [data-service-mapper](src/app/memory/data-service/data-service-mapper.ts).

## Como utilizar este recurso para carregar meus dados

Para isto basta criar um arquivo _minha-entidade.data.ts_ abaixo da pasta **e2e/src/** e criar uma chamada para a função **dataService**.

É recomenadado que os dados a serem _mocados_ sejam armazenados num arquivo separado _minha-entidade.mock.ts_ na mesma pasta onde fica o arquivo _minha-entidade.data.ts_, desta forma estes dados podem ser utilizados pelos testes unitários e e2e caso existam.

A assinatura da função espera os seguintes parâmetros:
```javascript
export type LoadFn = (dbService: IInMemoryDataService) => void;

function dataService(collectionName: string, loadFn: LoadFn): void;
``` 
Onde:

> **collectionName** ⇒ Nome da coleção a ser persistida no IndexDB. Exemplo: depositante, documento_expedicao
> **loadFn** ⇒ _Function_ ou _Arrow function_ com a assinatura _LoadFn_. Esta função receberá uma instância do serviço que simula o banco de dados em memória, permitindo assim configurar qual é a entidade que será persitida quando um deternado _end-point_ for chamado e como a minha entidade será persistida, quando possuir alguma particularidade.

A classe **InMemoryDataService** faz boa parte do trabalho para requisições simples, portanto para algumas reuisições não será necessário configurar nenhuma característica extra. :thumbsup: :smile:

Exemplo de como utilizar para entidades mais simples pode ser consultado aqui: [depositante.data.ts](e2e/src/depositante/depositante.data.ts).

Exemplo de como utilizar para entidades mais complexas pode ser consultado aqui: [documento-expedicao.data.ts](e2e/src/documento/expedicao/documento-expedicao.data.ts).

### Configurando URLs e nome da entidade

Configurando qual o caminho a ser interceptado para a entidade:
```javascript
. . .
import { collectionName, depositantes } from './depositante.mock';
. . .

  dbService.addReplaceUrl('recebimento/depositantes', collectionName);
  dbService.addReplaceUrl('recebimentoQuery/depositantes', collectionName);
```
Como nossa aplicação possui arquitetura CQRS sempre vão ter dois _end-points_ que deverão ser interceptados.
Basta colocar somente o caminho exclusivo da entidade, pois como o padrão _api/v1_ é sempre o mesmo já está configurado no serviço **InMemoryDataService**.

### Transformando os dados

Adicionando possíveis transformações para a entidade antes da mesma ser persistida ou recuperada:
```javascript
// file: depositante.data.ts
. . .
import { collectionName, depositantes } from './depositante.mock';
. . .

  dbService.addTransformPostMap(collectionName, (depositante: IDepositanteListar) => {
    depositante['pessoaFisica'] = depositante.documentoIdentificacao.length === 11;
    return depositante;
  });

  dbService.addTransformPutMap(collectionName, (item: any, depositante: IDepositanteListar) => {
    depositante['pessoaFisica'] = depositante.documentoIdentificacao.length === 11;
    return depositante;
  });

// file: documento-expedicao.data.ts
. . .
import { collectionName, documentos, mapToInterface } from './documento-expedicao.mock';
. . .

  dbService.addTransformGetMap(collectionName, (documento: any): any => {
    return mapToInterface(documento);
  });
```

### Filtrando os dados

Por padrão o serviço **InMemoryDataService** aplica filtros utilizando _Regex_ para filtros de valor único e de igualdade para filtros do tipo _Array_.

Configurando como os filtros das pesquisas deverão ser interpretados:

**Importante:** Os filtros são aplicados antes da função de transformação _TransformGetMap_, caso a mesma exista.
```javascript
// file: depositante.data.ts
. . .
import { collectionName, depositantes } from './depositante.mock';
. . .
  dbService.addSearchTermMap(collectionName, ['nome', 'documentoIdentificacao']);

// file: documento-expedicao.data.ts
. . .
import { collectionName, documentos, mapToInterface } from './documento-expedicao.mock';
. . .
  dbService.addSearchTermMap(collectionName, ['numero']);

  // filtros customizados para campos da busca avançada
  dbService.addFieldFilterMap(collectionName, 'dataEmissaoAte', (value: string, documento: IDocumentoExpedicaoList) => {
    return new Date(documento.dataEmissao) <= new Date(value + ' 23:59:59 -03');
  });

  dbService.addFieldFilterMap(collectionName, 'depositanteId', (value: string, documento) => {
    return documento.depositante.id === value;
  });

  dbService.addFieldFilterMap(collectionName, 'situacaoDocumentoProcesso', (value: any, documento) => {
    if (value instanceof Array) {
      return value.includes(documento.situacaoDocumentoProcesso);
    }
    return '' + value === documento.situacaoDocumentoProcesso;
  });
```

### Intercepando requisições especiais

Adicionando possíveis intercepatadores para requisições que não são para persitência ou recuperação simples de entidades.

```javascript
// file: documento-expedicao.data.ts
. . .
import { STATUS } from 'angular-in-memory-web-api';
import { IResponseUtils, ResponseInterceptorFn } from 'src/app/memory/data-service/in-memory-data.service';
import { collectionName, documentos, mapToInterface } from './documento-expedicao.mock';
. . .

  const responseAdicionarItem: ResponseInterceptorFn = (url: string, utils: IResponseUtils, body?: any): any =>  {
    let response: any;
    response = utils.errorResponseFn(url, STATUS.BAD_REQUEST, 'Mensagem de erro disparado pelo interceptador!');
    return response;
  };

  // Simulando uma resposta de erro utilizando uma função
  dbService.addRequestInterceptor({
    method: 'POST',
    path: `/api/v1/${collectionName}/adicionarItem`,
    response: responseAdicionarItem
  });

  // Simulando uma resposta OK enviando um JSON de resposta
  dbService.addRequestInterceptorByValue({
    method: 'POST',
    path: `/api/v1/${collectionName}/excluirItem`,
    response: {
      body: {
        id: 'd90c3653-62af-4521-8735-e51da48bfc2b'
      }
    }
  });
```

Para maiores detalhes podem ser consultadas as interfaces:
**IRequestInterceptor** e **IResponseUtils** no arquivo [in-memory-data.service.ts](src/app/memory/data-service/in-memory-data.service.ts).

## Usando as configurações na execução do projeto

Foi configurado uma versão do server em memória para isto, bastando iniciar a aplicação com o comando:
```
npm run serve:memory
```

