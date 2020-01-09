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

    @Input() turmaId: string;
    // @Input() set turmaId(x) {
    //     this.turmaId = x;
    //     alert(x);
    // }


    // @Input() set turmaId(x) {
    //     this.idTurma = x;
    //     if (this.formTurmaSimples && this.idTurma) {
    //         this.turmaByIdService.Get(this.idTurma).subscribe( turma => {
    //             this.idTurma = turma.id;
    //             this.formTurmaSimples.patchValue({ descricao: turma.descricao});
    //             this.formTurmaSimples.patchValue({ nrVagas: turma.nrVagas});
    //             this.formTurmaSimples.patchValue({ inicio: turma.inicio});
    //         });
    //     }
    // }

    modalTurmaDisciplinasPrimaria: PoModalAction = {
        action: () => {
            this.adicionarDiciplinas();
            this.modalDisciplina.close();
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
        //= new Turma('1345234', 'Turma Nova', new Date(2020, 10), 99, [], []);

        console.log('adicionarDisciplinas', this.formDisciplina.listDisciplinasSelecionadas);

        console.log('adicionarDisciplinas', this.turmaId);

        this.turmaGetByIdService.Get(this.turmaId).subscribe( callbackId => {
            console.log('turmaGetByIdService: ', callbackId);

            turma = callbackId;

            turma.listDisciplinas = turma.listDisciplinas.concat(this.formDisciplina.listDisciplinasSelecionadas);
            turma.listDisciplinas = this.mergeDisciplinas(turma.listDisciplinas, this.formDisciplina.listDisciplinasSelecionadas);

            // this.turmaDisciplinaIncluirService.Post(turma).subscribe( callbackIncluir => {
            //     console.log('turmaDisciplinaIncluirService: ', callbackIncluir);
            // });

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

}

