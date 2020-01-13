import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from './../../../../app/base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoStepperComponent, PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { TurmaComponent } from '../turma/turma.component';
import { ProfessorComponent } from '../../professor/professor.component';
import { TurmaDisciplinaIncluirComponent } from '../turma-disciplina/turma-disciplina-incluir.component';

@Component({
    selector: 'app-turma-step',
    templateUrl:  './turma-step.component.html',
    styleUrls: ['./turma-step.component.css']
})
export class TurmaStepComponent extends BaseComponent implements OnInit {

    @ViewChild('stepper', {static: true}) stepper: PoStepperComponent;
    @ViewChild('formTurma', {static: true}) formTurma: TurmaComponent;
    @ViewChild('formProfessor', {static: false}) formProfessor: ProfessorComponent;
    @ViewChild('modalProfessor', { static: true }) modalProfessor: PoModalComponent;

    @ViewChild('#formTurmaDisciplina', { static: true }) formTurmaDisciplina: TurmaDisciplinaIncluirComponent;
    turmaId =  '6d7e918a-e1c1-4eef-9436-07b1e7cab5f5';

    professorList = [{ value: 'Professor 01' }, { value: 'Professor 02' }, { value: 'Professor 03'}];

    modalProfessorAcaoPrimaria: PoModalAction = {
        action: () => {
            alert('acao primaria');
            this.modalProfessor.close();
        },
        label: this.global.i18n.literals.salvar
    };

    modalProfessorAcaoSecundaria: PoModalAction = {
    action: () => {
        alert('acao secundaria');
    },
    label: this.global.i18n.literals.cancelar
    };

    constructor(private global: GlobalService) {
        super();
    }

    ngOnInit(): void {

    }

    validarFormularioProfessor(): boolean {
        return this.formProfessor ? this.formProfessor.validForm() : false;
    }

    validarFormularioTurma(): boolean {
        return this.formTurma ? this.formTurma.simples.validForm() : false;
    }

    salvarTurma(): void {
        //this.turmaId = this.formTurma.simples.idTurma;
        this.formTurma.simples.save();
        this.formTurmaDisciplina.turmaId = this.turmaId;
        console.log('this.formTurmaDisciplina.turmaId =');

        //console.log('salvarTurma: ', this.formTurma.simples.idTurma);
        //this.turmaId = this.formTurma.simples.idTurma;
        //console.log('salvarTurma: ', this.formTurma.simples.idTurma);
    }

    salvarListaDisciplinas(): void {
        if (!this.formTurma.simples.idTurma) {
            this.salvarTurma();
        }
    }

    changeStep($event) {
        // console.log($event);
    }

    proximoStep() {
        if (this.formTurma.simples.validForm()) {
            this.stepper.next();
        }
    }

    voltarStep() {
        this.stepper.previous();
    }

    abrirModalProfessor(): void {
        this.modalProfessor.open();
    }

    incluirNovaDisciplina(): void {
        
    }
}
