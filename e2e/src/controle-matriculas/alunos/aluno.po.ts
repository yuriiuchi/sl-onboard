//import { ConfiguracaoSegundoPassoPage } from './configuracao-segundo-passo.po';
import { browser, $, $$, ElementFinder, protractor } from 'protractor';
//import { ConfiguracaoPrimeiroPassoPage } from './configuracao-primeiro-passo.po';
//import { ConfiguracaoTerceiroPassoPage } from './configuracao-terceiro-passo.po';

export class AlunoPage {

  // primeiroPassoPage = new ConfiguracaoPrimeiroPassoPage();
  // segundoPassoPage = new ConfiguracaoSegundoPassoPage();
  // terceiroPassoPage = new ConfiguracaoTerceiroPassoPage();

  get nome(): ElementFinder {
    return $('po-input input[name="aluno"]');
  }

  get email(): ElementFinder {
    return $('po-input input[name="email"]');
  }

  get cpf(): ElementFinder {
    return $('po-input input[name="cpf"]');
  }

  get matricula(): ElementFinder {
    return $('po-input input[name="matricula"]');
  }

  get formaIngresso(): ElementFinder {
    return $('po-combo input[name="combo"]');
  }

  get formaIngressoItem(): ElementFinder {
    return $$('.po-combo-item').get(0);
  }

  get botaoNovoAluno(): ElementFinder {
    return $('po-button[ng-reflect-label="Novo aluno"] button');
  }

  get botaoSalvar(): ElementFinder {
    return $('po-button[ng-reflect-label="Salvar"] button');
  }

  navigateTo() {
    return browser.get(`${browser.baseUrl}controle-matricula/alunos`) as Promise<any>;
  }

  get alunoNovoCadastrado(): ElementFinder {
    return $$('tr[ng-reflect-logical-row-index="4"] td').get(1);
  }

  get inputNome(): ElementFinder {
    return $('po-input[name="aluno"]');
  }

  get inputEmail(): ElementFinder {
    return $('po-input[name="email"]');
  }

  get inputCpf(): ElementFinder {
    return $('po-input[name="cpf"]');
  }

  get inputMatricula(): ElementFinder {
    return $('po-input[name="matricula"]');
  }

  get inputFormaIngresso(): ElementFinder {
    return $('po-combo[name="combo"]');
  }

  async preencherNovoAluno(
    aluno: {
      nome: string,
      cpf: string,
      email: string,
      matricula: string,
      formaIngresso: string,
    }
  ) {

    await this.nome.sendKeys(aluno.nome);
    await this.email.sendKeys(aluno.email);
    await this.cpf.sendKeys(aluno.cpf);
    await this.matricula.sendKeys(aluno.matricula);
    await this.formaIngresso.click();
    await this.formaIngressoItem.click();

    //console.log(this.nome.getAttribute('class'));
    //class="po-lg-12 po-md-12 po-sm-12 ng-untouched ng-invalid ng-dirty"

    //await this.formaIngresso.click();
    //await this.formaIngressoItem.click();

    //await this.botaoSalvar.click();

  }

  //console.log('exemplo de asyn wait com promise');
  // async wait(ms) {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, ms);
  //   });
  // }

  async wait(ms) {
    return browser.sleep(ms);
  }



  async salvar() {
    await this.botaoNovoAluno.click();
    await this.preencherNovoAluno(
      {
        nome: 'Aluno teste e2e salvar',
        cpf: '50425669025',
        email: 'alunoTeste@gmail.com',
        matricula: 'Mat001',
        formaIngresso: 'Vestibular'
      });

    await this.botaoSalvar.click();

    //console.log('kkkkkkkkkkkkkkkkkkkkkkk', this.alunoNovoCadastrado.getText());

}
  // get nome(): ElementFinder {
  //   return $('po-input[ng-reflect-label="Aluno"]');
  // }
  
// form [formGroup]="formAluno"
// po-input formControlName="nome" p-label="Aluno" name="aluno"
// po-input formControlName="email" p-label="email" name="email"
// po-input formControlName="cpf" p-label="cpf" name="cpf" p-mask="999.999.999-99"
// po-input formControlName="matricula" p-label="matricula" name="matricula"
// po-combo class="po-lg-4 po-md-4 po-sm-12" formControlName="formaIngresso" name="combo" [p-label]=global.i18n.literals.formaIngresso

  // get nomeUnidade(): ElementFinder {
  //   return $$('po-input input[formcontrolname=""]').get(0);
  // }

  // // get asdfasdf(): ElementFinder {
  // //   return $('#meuid');
  // // }

  //  get primeiroStep(): ElementFinder {
  //   return $$('.po-stepper-step-done').get(0);
  // }

  // navigateTo() {
  //   return browser.get(`${browser.baseUrl}configuracaoInicial`) as Promise<any>;
  // }

  // get loading(): ElementFinder {
  //   return $('.po-overlay-absolute');
  // }

  // async esperarLoading() {
  //   await browser.wait(protractor.ExpectedConditions.invisibilityOf(this.loading));
  // }
}
