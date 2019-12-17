import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoModalComponent } from '@portinari/portinari-ui';

@Component({
    selector: 'app-aluno-list',
    templateUrl: './aluno-list.component.html',
    styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {

    @ViewChild('modalAluno', { static: true }) modalAluno: PoModalComponent;

    constructor(private global: GlobalService) {

    }

    ngOnInit(): void {

    }

    abrirModalAluno(): void {
        this.modalAluno.open();
    }
}
