# WMS THF - Suite Logística

Projeto do portal de gestão do WMS SaaS

## Começando

As instruções a seguir permitirão que você entenda a estrutura do projeto, copie o mesmo e rode em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Antes de iniciar verifique se você possui os programas instalados corretamente:

* [Node](https://nodejs.org/en/) > 10
* [Git](https://git-scm.com/)

Recomendamos os seguintes pacotes globais `npm`:

* `@angular/cli`
```
npm i -g @angular/cli
```

### Instalação

Siga os passos abaixo:

* Escolha um diretório de trabalho e inicie o terminal a partir deste diretório;
* Efetue a cópia do projeto através do comando:
```
git clone https://totvstfs.visualstudio.com/SuiteLogistica/_git/SL-WMSThf
```
* Acesse o diretório do projeto copiado e instale as dependências através da seguinte comando:
```
npm install
```

### Estrutura do projeto

* Diretório base: src/app

* Módulo raiz: 
  * primeira rota da aplicação;
  * quando é um menu intermediário, pode conter 1 ou n sub-módulos;
  * quando não é um menu intermediário, pode conter 1 ou n módulos de páginas;
  
  Exemplo: <diretório-base>/configuracao (http://[servidor]:[porta]/wms/<b>configuracao</b>)

* Sub-módulo:
  * segunda rota da aplicação;
  * possui praticamente a mesma estrutura do módulo raiz;
  * pode conter 1 ou n módulos de páginas;

  Exemplo: <diretório-base>/configuracao/depositante (http://<servidor>:<porta>/wms/configuracao/<b>depositante</b>)

* Módulo de página:
  * rota filha do módulo raíz ou de um sub-módulo;
  
  Exemplo: <diretório-base>/configuracao/depositante/depositante-incluir-alterar (http://<servidor>:<porta>/wms/configuracao/depositante/<b>incluir</b>)

* Módulos Shared:
  * São módulos com recursos compartilhados para o projeto, servindo apenas para re-exportar dependências; Não devem conter imports;
  * shared.module: Contém apenas exportação de módulos de serviços a nivel de aplicação;
    * Não deve ser utilizado para exportar componentes visuais(pendente de refatoração);
  * page.module: Contém componentes utilizados em páginas de visualização;
  * form.module: Contém componentes utilizados em páginas de entrada de dados;
  * list.module: Contém componentes utilizados em páginas com listagem de dados;

```
APP
 |__modulo-raiz:
    |
    |__modulo-pagina:
    |  |_modulo-pagina.component.ts
    |  |_modulo-pagina.component.html
    |  |_modulo-pagina.component.css
    |  |_modulo-pagina.module.ts
    |  |_modulo-pagina-routing.module.ts
    |  |_modulo-pagina.component.spec.ts
    |  |__services
    |     |_modulo-pagina.interface.ts
    |     |_modulo-pagina.service.ts
    |
    |__sub-modulo:
    |  |
    |  |__modulo-pagina:
    |  |  |_modulo-pagina.component.ts
    |  |  |_modulo-pagina.component.html
    |  |  |_modulo-pagina.component.css
    |  |  |_modulo-pagina.module.ts
    |  |  |_modulo-pagina-routing.module.ts
    |  |  |_modulo-pagina.component.spec.ts
    |  |  |__services
    |  |     |_modulo-pagina.interface.ts
    |  |     |_modulo-pagina.service.ts
    |  |_sub-modulo.component.ts
    |  |_sub-modulo.component.html
    |  |_sub-modulo.component.css
    |  |_sub-modulo.component.spec.ts
    |  |__services
    |  |  |_sub-modulo.interface.ts
    |  |  |_sub-modulo.service.ts
    |  |_sub-modulo-routing.module.ts
    |  |_sub-modulo.module.ts
    |__services
    |__entities
    |
    |_modulo-raiz.component.ts
    |_modulo-raiz.component.html
    |_modulo-raiz.component.css
    |_modulo-raiz.component.spec.ts
    |__services
    |  |_modulo-raiz.interface.ts
    |  |_modulo-raiz.service.ts
    |_modulo-raiz-routing.module.ts
    |_modulo-raiz.module.ts
```

## Rodando os testes e verificação de formatação de fonte

Alterações e melhorias só serão aceitas caso a validação `padrão do estilo do código`, `testes unitários` e `testes ponto a ponto automatizados` seja executada com sucesso.

### TSLint

Garante a boa formatação do código do fonte para garantir uma boa leitura visual da implementação.

```
// Localmente utilize:
npm run lint

// CI Utiliza o comando:
npm run lint:ci
```

### Testes unitários

Testes de métodos isolados.

```
// Localmente utilize:
npm run test

// CI Utiliza o comando:
npm run test:ci
```

### Testes ponto a ponto

Testes que abrangem a utilização de funcionalidades da aplicação do começo ao fim.

* Atualize o web-driver na primeira vez ou quando necessário:
  ```
  npm run webdriver-manager:update
  ```

* Inicie o ambiente em memória (em um terminal para mantê-lo ativo):
  ```
  npm run serve:memory
  ```

* Execute os testes ponto a ponto (em outro terminal), quantas vezes precisar:
  ```
  npm run e2e
  ```

No CI, o comando é diferente pois executa todo o processo de atualização de web-drive, compilação, execução e testes.

```
npm run e2e:ci
```

## Rodando a aplicação em desenvolvimento com servidor de dados mocados

Para codificar e testar a aplicação com os dados mocados com o memory, utilize o comando:

* Execute o comando abaixo para subir o ```memory``` simular as requisições de endpoint
```
npm run serve:memory
```

## Rodando a aplicação em desenvolvimento com servidor de backend local:

Suba os serviços de backend locais.

Configure em seu arquivos de ```hosts```:
```
127.0.1.1	totvs.local
```

Utilize o comando para subir a aplicação de frontend local:

```
npm run serve:local
```

## Construido com:

* [Angular](https://angular.io/) - Framework de desenvolvimento web e mobile
* [Portinari](https://portinari.io/) - Biblioteca de componentes, diretivas e serviços
* [Npm](https://www.npmjs.com/) - Gerenciador de dependencias
* [TotvsLogBaseFoundation](https://www.npmjs.com/package/totvs-log-base-foundation) - Biblioteca de componentes, diretivas e serviços
* [TotvsLogWebFoundation](https://www.npmjs.com/package/totvs-log-web-foundation) - Biblioteca de componentes, diretivas e serviços

## Autor

[**TOTVS**](https://totvs.com.br) - *Supply Chain - Suíte Logística*

## Licença

Este projeto é privado, licenciado pela TOTVS.
