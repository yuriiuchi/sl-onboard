import { Component, ViewChild, OnInit } from '@angular/core';

import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';
import { PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { TurmaDisciplinaListFormComponent } from './turma-disciplina-list-form.component';
import { DisciplinaListFormComponent } from '../../disciplina/disciplina-list/disciplina-list-form.component';

@Component({
    selector: 'app-turma-disciplina-incluir',
    templateUrl: './turma-disciplina-incluir.component.html',
    styleUrls: ['./turma-disciplina-incluir.component.css']
})
export class TurmaDisciplinaIncluirComponent extends BaseComponent implements OnInit {

    @ViewChild('modalDisciplinas', { static: true }) modalDisciplina: PoModalComponent;
    @ViewChild('formListTurmaDisciplina', { static: true }) formListTurmaDisciplina: TurmaDisciplinaListFormComponent;
    @ViewChild('formDisciplina', { static: true }) formDisciplina: DisciplinaListFormComponent;

    modalTurmaDisciplinasPrimaria: PoModalAction = {
        action: () => {
            this.adicionarDiciplinas();
            this.modalDisciplina.close();
            this.formListTurmaDisciplina.carregarDisciplinas();
        },
        label: this.global.i18n.literals.salvar
    };

    constructor(
        public global: GlobalService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
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

    private adicionarDiciplinas() {
        console.log('adicionarDiciplinas', this.formDisciplina.listDisciplinasSelecionadas);
    }

}
