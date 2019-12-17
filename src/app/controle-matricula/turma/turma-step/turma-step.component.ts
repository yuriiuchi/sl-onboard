import { Component, OnInit, ViewChild } from "@angular/core";

import { BaseComponent } from './../../../../app/base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { PoStepperComponent, PoModalComponent } from '@portinari/portinari-ui';
import { TurmaComponent } from '../turma/turma.component';
import { ProfessorComponent } from '../../professor/professor.component';

@Component({
    selector: 'app-turma-step',
    templateUrl:  './turma-step.component.html',
    styleUrls: ['./turma-step.component.css']
})
export class TurmaStepComponent extends BaseComponent implements OnInit {

    @ViewChild('stepper', {static: true}) stepper : PoStepperComponent;
    @ViewChild('formTurma', {static: true}) formTurma : TurmaComponent;
    @ViewChild('formProfessor', {static: false}) formProfessor : ProfessorComponent;

    @ViewChild('modalProfessor', { static: true }) modalProfessor: PoModalComponent;

    professorList = [{ value: 'Option 1' }, { value: 'Option 2' }];
  
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

    changeStep($event){
        //console.log($event);
    }
    

    teste(){
        if (this.formTurma.simples.validForm()){
            this.stepper.next();
        }
    }
    teste2(){
        this.stepper.previous();
    }

    canActiveTeste2(form: ProfessorComponent){
        this.stepper.steps[0].label = 'testestestsetestes' 
        return this.formTurma.simples.validForm;
    }

    abrirModalProfessor(): void {
        this.modalProfessor.open();
    }
} 