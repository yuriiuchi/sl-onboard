import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { cpfValidator, ShowMessageType } from 'totvs-log-base-foundation';

import { BaseComponent } from '../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { AlunoIncluirService } from './services/aluno-incluir.service';
import { AlunoAlterarService } from './services/aluno-alterar.service';
import { Aluno } from './entities/aluno.entity';
@Component({
    selector:  'app-aluno',
    templateUrl: './aluno.component.html',
    styleUrls: ['./aluno.component.css']
})
export class AlunoComponent extends BaseComponent implements OnInit {

    private formAluno: FormGroup;
    formaIngressoList = [{ value: 'ENADE' }, { value: 'Vestibular' }];

    constructor(
        private global: GlobalService,
        private alunoIncluirService: AlunoIncluirService,
        private alunoAlterarService: AlunoAlterarService) {
        super();

        this.formAluno = new FormGroup({
            nome: new FormControl('',  [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            cpf: new FormControl('', [Validators.required, cpfValidator()]),
            matricula: new FormControl('', [Validators.required]),
            formaIngresso: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {}

    public validForm(): boolean {
        return this.formAluno.valid;
    }

    salvar(): void {
        console.log('salvar: ', this.formAluno.get('formaIngresso').value);
        console.log(this.formAluno.get('nome').value);
        const aluno = new Aluno(
            '',
            this.formAluno.get('nome').value,
            this.formAluno.get('email').value,
            this.formAluno.get('cpf').value,
            this.formAluno.get('matricula').value,
            this.formAluno.get('formaIngresso').value
            );

        this.alunoIncluirService.Post(aluno).subscribe( calback => {
            console.log(calback);
            this.global.msg.displayMessage({
                messageType: ShowMessageType.NotificationSuccess,
                messageText: 'Aluno incluido com sucesso'
            });
        });
    }
}
