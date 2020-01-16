import { Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from './../../../../app/base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoStepperComponent, PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { TurmaComponent } from '../turma/turma.component';
import { TurmaDisciplinaIncluirComponent } from '../turma-disciplina/turma-disciplina-incluir.component';
import { ProfessorFormComponent } from '../../professor/professor-form/professor-form.component';

@Component({
    selector: 'app-turma-step',
    templateUrl:  './turma-step.component.html',
    styleUrls: ['./turma-step.component.css']
})
export class TurmaStepComponent extends BaseComponent implements OnInit {

    @ViewChild('stepper', {static: true}) stepper: PoStepperComponent;
    @ViewChild('formTurma', {static: false}) formTurma: TurmaComponent;
    @ViewChild('formProfessor', {static: false}) formProfessor: ProfessorFormComponent;
    @ViewChild('modalProfessor', { static: true }) modalProfessor: PoModalComponent;

    @ViewChild('#formTurmaDisciplina', { static: false }) formTurmaDisciplina: TurmaDisciplinaIncluirComponent;
    //turmaId = '6d7e918a-e1c1-4eef-9436-07b1e7cab5f5';
    turmaId = '';
    variavel: number = 10;

    professorList = this.carregarProfessores;

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

    validarTurmaEDisciplina(): boolean {
        return (this.formTurma ? this.formTurma.simples.validForm() : false);
    }

    salvarTurma(): void {
        this.formTurma.simples.salvando().subscribe( callback => {
            this.turmaId = callback;
        });
    }

    salvarListaDisciplinas(): void {
        if (!this.formTurma.simples.idTurma) {
            this.salvarTurma();
        }
    }

    salvarAlunos(): void {
        if (this.formTurma.simples.idTurma) {
            this.salvarTurma();
        }
    }

    changeStep($event) {
        
    }

    proximoStep() {
        if (this.formTurma.simples.validForm()) {
            this.salvarTurma();
            this.stepper.next();
        }
    }

    clickStep(): boolean {
        if (this.formTurma.simples.validForm()) {
            this.salvarTurma();
        }
        return true;
    }

    voltarStep() {
        console.log('voltarStep()', this.stepper.currentStepIndex);
        console.log('voltarStep()', this.stepper);
        console.log('voltarStep()', this.stepper.step);
        if (this.stepper.currentStepIndex > 0) {
            this.stepper.previous();
        }
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
        return [{ value: 'Professor 01' }, { value: 'Professor 02' }, { value: 'Professor 03'}];
    }
}
