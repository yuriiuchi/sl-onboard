import { Component, ViewChild, OnInit, Input } from '@angular/core';

import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';
import { PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { TurmaDisciplinaListFormComponent } from './turma-disciplina-list-form.component';
import { DisciplinaListFormComponent } from '../../disciplina/disciplina-list/disciplina-list-form.component';
import { TurmaGetByIdService } from '../services/turma-get-by-id.service';
import { TurmaDisciplinaIncluirService } from '../services/turma-disciplina-incluir.service';
import { Turma } from '../entities/turma.entitiy';
import { TurmaDisciplinaAlterarService } from '../services/turma-disciplina-alterar.service';
import { Disciplina } from '../../disciplina/entities/disciplina.entity';
import { disciplinas } from 'e2e/src/controle-matriculas/disciplinas/disciplina.mock';

@Component({
    selector: 'app-turma-disciplina-incluir',
    templateUrl: './turma-disciplina-incluir.component.html',
    styleUrls: ['./turma-disciplina-incluir.component.css']
})
export class TurmaDisciplinaIncluirComponent extends BaseComponent implements OnInit {

    @ViewChild('modalDisciplinas', { static: true }) modalDisciplina: PoModalComponent;
    @ViewChild('formListTurmaDisciplina', { static: true }) formListTurmaDisciplina: TurmaDisciplinaListFormComponent;
    @ViewChild('formDisciplina', { static: true }) formDisciplina: DisciplinaListFormComponent;
    @ViewChild('modalNovaDisciplina', { static: true }) modalNovaDisciplina: PoModalComponent;

    @Input() turmaId: string;

    modalTurmaDisciplinasPrimaria: PoModalAction = {
        action: () => {
            this.adicionarDiciplinas();
            this.modalDisciplina.close();
        },
        label: this.global.i18n.literals.salvar
    };

    // modalNovaTurmaDisciplinaPrimaria: PoModalAction = {
    //     action: () => {
    //         this.novaDisciplina();
    //         this.modalNovaDisciplina.close();
    //     },
    //     label: this.global.i18n.literals.salvar
    // };

    modalNovaDisciplinaPrimaria: PoModalAction = {
        action: () => {
            this.novaDisciplina();
            this.modalNovaDisciplina.close();
        },
        label: this.global.i18n.literals.salvar
    };

    constructor(
        public global: GlobalService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private turmaGetByIdService: TurmaGetByIdService,
        private turmaDisciplinaIncluirService: TurmaDisciplinaIncluirService,
        private turmaDisciplinaAlterarService: TurmaDisciplinaAlterarService
    ) {
        super();
    }

    ngOnInit(): void {
        this.alterarIdioma();
        this.carregarTurmaDisciplina();
    }

    private alterarIdioma(): void {

    }

    private carregarTurmaDisciplina(): void {

    }

    abrirModalDisciplina(): void {
        this.modalDisciplina.open();
    }

    private mergeDisciplinas(
        listDisciplinas1: Array<Disciplina>, 
        listDisciplinas2: Array<Disciplina>): Array<Disciplina> {
        listDisciplinas1.map( disciplina => {
            let encontrado = false;

            listDisciplinas2.forEach( dis => {
                if (disciplina.id === dis.id) {
                    encontrado = true;
                }
            });
            if (!encontrado) {
                listDisciplinas2.push(disciplina);
            }
        });
        return listDisciplinas2;
    }

    private adicionarDiciplinas() {
        let turma: Turma;
        this.turmaGetByIdService.Get(this.turmaId).subscribe( callbackId => {
            turma = callbackId;
            turma.listDisciplinas = turma.listDisciplinas.concat(this.formDisciplina.listDisciplinasSelecionadas);
            turma.listDisciplinas = this.mergeDisciplinas(turma.listDisciplinas, this.formDisciplina.listDisciplinasSelecionadas);

            // this.turmaDisciplinaIncluirService.Post(turma).subscribe( callbackIncluir => {
            //     console.log('turmaDisciplinaIncluirService: ', callbackIncluir);
            // });
            console.log('Está somente alterando corrigir o incluir: ');
            console.log('TurmaId fixo: ');

            this.turmaDisciplinaAlterarService.Post(turma).subscribe ( callbackAlterar => {
                console.log('turmaDisciplinaAlterarService', callbackAlterar);
                this.formListTurmaDisciplina.carregarDisciplinas();
            });
        });
    }

    private mergeRemoveDisciplinas(
        listDisciplinas1: Array<Disciplina>,
        listDisciplinas2: Array<Disciplina>): Array<Disciplina> {

        const retorno: Array<Disciplina> = [];
        listDisciplinas1.map( disciplina => {
            let encontrado = false;

            listDisciplinas2.forEach( dis => {
                if (disciplina.id === dis.id) {
                    encontrado = true;
                }
            });
            if (!encontrado) {
                retorno.push(disciplina);
            }
        });
        return retorno;
    }

    removerDisciplinas() {
        let turma: Turma;
        console.log('remover: ', this.formDisciplina.listDisciplinasSelecionadas);

        this.turmaGetByIdService.Get(this.turmaId).subscribe( callbackId => {
            turma = callbackId;
            turma.listDisciplinas = this.mergeRemoveDisciplinas(turma.listDisciplinas, 
                this.formListTurmaDisciplina.listDisciplinasSelecionadas);
            this.turmaDisciplinaAlterarService.Post(turma).subscribe ( callbackAlterar => {
                this.formListTurmaDisciplina.carregarDisciplinas();
            });
        });
    }

    abrirModalNovaDisciplina(): void {
        this.modalNovaDisciplina.open();
    }

    novaDisciplina() {
        // let turma: Turma;
        // this.turmaGetByIdService.Get(this.turmaId).subscribe( callbackId => {
        //     turma = callbackId;
        //     //turma.listDisciplinas = this.mergeDisciplinas(turma.listDisciplinas, this.formDisciplina.listDisciplinasSelecionadas);

        //     console.log('Está somente alterando corrigir o incluir: ');
        //     console.log('TurmaId fixo: ');

        //     this.turmaDisciplinaAlterarService.Post(turma).subscribe ( callbackAlterar => {
        //         console.log('turmaDisciplinaAlterarService', callbackAlterar);
        //         this.formListTurmaDisciplina.carregarDisciplinas();
        //     });

        //     //incluir na tabela de disciplina para simular o backend
        // });
        alert('incluir nova disciplina');
    }


}

