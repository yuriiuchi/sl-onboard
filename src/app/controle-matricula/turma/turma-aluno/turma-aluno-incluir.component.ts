import { Component, ViewChild, OnInit, Input } from '@angular/core';

import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';
import { PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { TurmaAlunoListFormComponent } from './turma-aluno-list-form.component';
//import { AlunoListFormComponent } from '../../aluno/aluno-list/aluno-list-form.component';
import { TurmaGetByIdService } from '../services/turma-get-by-id.service';
import { TurmaAlunoIncluirService } from '../services/turma-aluno-incluir.service';
import { Turma } from '../entities/turma.entitiy';
import { TurmaAlunoAlterarService } from '../services/turma-aluno-alterar.service';
import { Aluno } from '../../aluno/entities/aluno.entity';
import { alunos } from 'e2e/src/controle-matriculas/alunos/aluno.mock';

@Component({
    selector: 'app-turma-aluno-incluir',
    templateUrl: './turma-aluno-incluir.component.html',
    styleUrls: ['./turma-aluno-incluir.component.css']
})
export class TurmaAlunoIncluirComponent extends BaseComponent implements OnInit {

    @ViewChild('modalAlunos', { static: true }) modalAlunos: PoModalComponent;
    @ViewChild('formListTurmaAluno', { static: true }) formListTurmaAluno: TurmaAlunoListFormComponent;
    @ViewChild('formAluno', { static: true }) formAluno: TurmaAlunoListFormComponent;

    @Input() turmaId: string;

    modalTurmaAlunosPrimaria: PoModalAction = {
        action: () => {
            console.log('modalTurmaAlunosPrimaria: ', this.turmaId);
            this.adicionarAlunos();
            this.modalAlunos.close();
        },
        label: this.global.i18n.literals.salvar
    };

    constructor(
        public global: GlobalService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private turmaGetByIdService: TurmaGetByIdService,
        private turmaAlunosIncluirService: TurmaAlunoIncluirService,
        private turmaAlunosAlterarService: TurmaAlunoAlterarService
    ) {
        super();
    }

    ngOnInit(): void {
        this.alterarIdioma();
        this.carregarTurmaAluno();
    }

    private alterarIdioma(): void {

    }

    private carregarTurmaAluno(): void {

    }

    abrirModalAluno(): void {
        this.modalAlunos.open();
    }

    abrirModalNovoAluno(): void {
        this.modalAlunos.open();
    }

    private mergeAlunos(
        listAlunos1: Array<Aluno>,
        listAlunos2: Array<Aluno>): Array<Aluno> {
            listAlunos1.map( aluno => {
            let encontrado = false;

            console.log('mergeAlunos:', listAlunos2);
            listAlunos2.forEach( al => {
                if (aluno.id === al.id) {
                    encontrado = true;
                }
            });
            if (!encontrado) {
                listAlunos2.push(aluno);
            }
        });
            return listAlunos2;
    }

    private adicionarAlunos() {
        let turma: Turma;
        console.log('adicionarAlunos', this.turmaId);

        this.turmaGetByIdService.Get(this.turmaId).subscribe( callbackId => {
            console.log('turmaGetByIdService: ', callbackId);
            turma = callbackId;
            turma.listAlunos = this.mergeAlunos(turma.listAlunos, this.formAluno.listAlunosSelecionados);

            this.turmaAlunosAlterarService.Post(turma).subscribe ( callbackAlterar => {
                console.log('turmaAlunosAlterarService', callbackAlterar);
                this.formListTurmaAluno.carregarAlunos();
            });
        });

    }

    private mergeRemoveAlunos(
        listAlunos1: Array<Aluno>,
        listAlunos2: Array<Aluno>): Array<Aluno> {

        const retorno: Array<Aluno> = [];
        listAlunos1.map( aluno => {
            let encontrado = false;

            console.log('mergeRemoveAlunos:', listAlunos2);
            listAlunos2.forEach( al => {
                if (aluno.id === al.id) {
                    encontrado = true;
                }
            });
            if (!encontrado) {
                retorno.push(aluno);
            }
        });
        return retorno;
    }

    removerAlunos() {
        let turma: Turma;
        console.log('remover: ', this.formAluno.listAlunosSelecionados);

        this.turmaGetByIdService.Get(this.turmaId).subscribe( callbackId => {
            turma = callbackId;
            turma.listAlunos = this.mergeRemoveAlunos(turma.listAlunos,
                this.formListTurmaAluno.listAlunosSelecionados);
            this.turmaAlunosAlterarService.Post(turma).subscribe ( callbackAlterar => {
                this.formListTurmaAluno.carregarAlunos();
            });
        });
    }

}

