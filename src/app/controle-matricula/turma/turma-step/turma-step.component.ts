import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from './../../../../app/base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoStepperComponent, PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { TurmaComponent } from '../turma/turma.component';
import { ProfessorComponent } from '../../professor/professor.component';
import { TurmaDisciplinaIncluirComponent } from '../turma-disciplina/turma-disciplina-incluir.component';
import { ProfessorFormComponent } from '../../professor/professor-form/professor-form.component';

@Component({
    selector: 'app-turma-step',
    templateUrl:  './turma-step.component.html',
    styleUrls: ['./turma-step.component.css']
})
export class TurmaStepComponent extends BaseComponent implements OnInit {

    @ViewChild('stepper', {static: true}) stepper: PoStepperComponent;
    @ViewChild('formTurma', {static: true}) formTurma: TurmaComponent;
    @ViewChild('formProfessor', {static: false}) formProfessor: ProfessorFormComponent;
    @ViewChild('modalProfessor', { static: true }) modalProfessor: PoModalComponent;

    @ViewChild('#formTurmaDisciplina', { static: true }) formTurmaDisciplina: TurmaDisciplinaIncluirComponent;
    turmaId = '6d7e918a-e1c1-4eef-9436-07b1e7cab5f5';

    professorList = this.carregarProfessores;

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
        console.log('corrigir alteração no form');
        return this.formProfessor ? this.formProfessor.validForm() : false;
    }

    validarFormularioTurma(): boolean {
        return this.formTurma ? this.formTurma.simples.validForm() : false;
    }

    validarTurmaEDisciplina(): boolean {
        return (this.formTurma ? this.formTurma.simples.validForm() : false);
    }

    salvarTurma(): void {
        this.formTurma.simples.save();
        this.formTurmaDisciplina.turmaId = this.turmaId;
        console.log('this.formTurmaDisciplina.turmaId =');
    }

    salvarListaDisciplinas(): void {
        if (!this.formTurma.simples.idTurma) {
            this.salvarTurma();

            this.formTurmaDisciplina.formDisciplina
        }
    }

    salvarAlunos(): void {
        if (this.formTurma.simples.idTurma) {
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

    salvarTudo(): void {
        this.salvarTurma();
        this.salvarListaDisciplinas();
        this.salvarAlunos();
    }

    carregarProfessores(): any {
        //professorList = this.carregarProfessores;
        return [{ value: 'Professor 01' }, { value: 'Professor 02' }, { value: 'Professor 03'}];
    }
}
