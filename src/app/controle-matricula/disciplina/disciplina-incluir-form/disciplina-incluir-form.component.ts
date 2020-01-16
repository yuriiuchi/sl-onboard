import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../../base/base.component';
import { Turma } from './../../turma/entities/turma.entitiy';
import { GlobalService } from 'totvs-log-web-foundation';
import { DisciplinaIncluirService } from '../../disciplina/services/disciplina-incluir.service';
import { DisciplinaAlterarService } from '../../disciplina/services/disciplina-alterar.service';
import { ShowMessageType } from 'totvs-log-base-foundation';
//import { TurmaGetByIdService } from '../../turma/services/turma-get-by-id.service';
//import { disciplinas } from 'e2e/src/controle-matriculas/disciplinas/disciplina.mock';
import { Disciplina } from '../entities/disciplina.entity';
import { disciplinas } from 'e2e/src/controle-matriculas/disciplinas/disciplina.mock';
import { DisciplinaGetByIdService } from '../services/disciplina-get-by-id.service';
import { PoModalComponent, PoModalAction } from '@portinari/portinari-ui';
import { ProfessorFormComponent } from '../../professor/professor-form/professor-form.component';
import { ProfessorAlterarService } from '../../professor/services/professor-alterar.service';
import { ProfessorGetAllService } from '../../professor/services/professor-get-all.service';
import { IProfessorGetAll } from '../../professor/entities/professor-get-all.interface';

@Component({
    selector:  'app-disciplina-incluir-form',
    templateUrl: './disciplina-incluir-form.component.html',
    styleUrls: ['./disciplina-incluir-form.component.css']
})
export class DisciplinaIncluirFormComponent extends BaseComponent implements OnInit {

    @ViewChild('modalProfessor', { static: true }) modalProfessor: PoModalComponent;
    @ViewChild('formProfessor', { static: true }) formProfessor: ProfessorFormComponent;
    @Input() set disciplinaId(x) {
         this.idDisciplina = x;
    }

    formDisciplinaIncluir: FormGroup;
    public idDisciplina: string;
    disciplina: Disciplina;

    professorList = [{ value: 'Professor algum' }, { value: 'Outro Professor' }, { value: 'mais professor'}];

    modalProfessorAcaoPrimaria: PoModalAction = {
        action: () => {
            this.formProfessor.salvar();
            this.modalProfessor.close();
            this.carregarprofessores();
        },
        label: this.global.i18n.literals.salvar
    };

    get descricao() {
        return this.formDisciplinaIncluir.get('descricao').value;
    }

    get sigla() {
        return this.formDisciplinaIncluir.get('sigla').value;
    }

    get cargaHoraria() {
        return this.formDisciplinaIncluir.get('cargaHoraria').value;
    }

    get professor() {
        return this.formDisciplinaIncluir.get('professor').value;
    }

    constructor(
        private global: GlobalService,
        private disciplinaIncluirService: DisciplinaIncluirService,
        private disciplinaAlterarService: DisciplinaAlterarService,
        private disciplinaGetByIdService: DisciplinaGetByIdService,
        private professorGetAllService: ProfessorGetAllService,
    ) {
        super();
        this.formDisciplinaIncluir = new FormGroup({
            descricao: new FormControl('', [Validators.required]),
            sigla: new FormControl('', [Validators.required]),
            cargaHoraria: new FormControl('', [Validators.required, Validators.min(8), Validators.max(80)]),
            professor: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {
        this.carregarprofessores();
    }

    validForm(): boolean {
        return this.formDisciplinaIncluir.valid;
    }

    salvar(): void {
        this.incluir();
    }

    alterar(id: string): void {
         if (this.formDisciplinaIncluir.valid) {

            this.disciplinaGetByIdService.Get(this.idDisciplina).subscribe( disciplina => {

                 this.disciplinaAlterarService.Post(disciplina).subscribe( callback => {
                     this.global.msg.displayMessage({
                         messageType: ShowMessageType.NotificationSuccess,
                         messageText: 'disciplina incluida com sucesso'
                     });
                     }
                 );
             });
         } else {
             this.global.msg.displayMessage({
                 messageType: ShowMessageType.NotificationInformation,
                 messageText: 'Não é possivel alterar a disciplina. Faltam informações obrigatórias'
             });
         }
    }

    incluir() {
        if (this.formDisciplinaIncluir.valid) {
            const disciplina: Disciplina = {
                id: this.idDisciplina,
                descricao: this.descricao,
                sigla: this.sigla,
                cargaHoraria: this.cargaHoraria,
                professor: this.professor
            };

            this.disciplinaIncluirService.Post(disciplina).subscribe( callback => {
                this.idDisciplina = callback;

                this.global.msg.displayMessage({
                    messageType: ShowMessageType.NotificationSuccess,
                    messageText: 'Disciplina salva com sucesso'
                });

            });

        } else {
            this.global.msg.displayMessage({
                messageType: ShowMessageType.NotificationInformation,
                messageText: 'Não é possivel salvar a turma. Faltam informações obrigatórias'
            });
        }
    }

    abrirModalProfessor() {
        this.modalProfessor.open();
    }

    salvarProfessor(): void {
        this.formProfessor.salvar();
    }

    carregarprofessores(): void {
        this.professorGetAllService.reset().subscribe( (callback: Array<IProfessorGetAll>) => {
            this.professorList = callback.map( back => {
                return { value: back.nome };
            });
        });
    }
}

