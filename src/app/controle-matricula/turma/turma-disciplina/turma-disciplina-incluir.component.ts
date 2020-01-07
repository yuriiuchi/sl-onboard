import { Component, ViewChild, OnInit } from '@angular/core';

import { BaseComponent } from './../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { Router, ActivatedRoute } from '@angular/router';
import { PoModalComponent } from '@portinari/portinari-ui';

@Component({
    selector: 'app-turma-disciplina-incluir',
    templateUrl: './turma-disciplina-incluir.component.html',
    styleUrls: ['./turma-disciplina-incluir.component.css']
})
export class TurmaDisciplinaIncluirComponent extends BaseComponent implements OnInit {

    @ViewChild('modalDisciplinas', { static: true }) modalDisciplina: PoModalComponent;
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
        //this.carregarTurmaDisciplina();
    }

}
