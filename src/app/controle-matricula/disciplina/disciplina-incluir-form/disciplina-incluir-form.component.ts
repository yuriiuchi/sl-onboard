import { Component, OnInit, Input } from '@angular/core';
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

@Component({
    selector:  'app-disciplina-incluir-form',
    templateUrl: './disciplina-incluir-form.component.html',
    styleUrls: ['./disciplina-incluir-form.component.css']
})
export class DisciplinaIncluirFormComponent extends BaseComponent implements OnInit {

    @Input() set disciplinaId(x) {
         this.idDisciplina = x;
        // if (this.formDisciplinaIncluir && this.idDisciplina) {

            // this.turmaByIdService.Get(this.idTurma).subscribe( turma => {
            //     console.log('@Input() set turmaId(x): ', turma);

                //this.idTurma = turma.id;

                // this.formDisciplinaIncluir.patchValue({ descricao: turma.descricao});
                // this.formDisciplinaIncluir.patchValue({ nrVagas: turma.nrVagas});
                // this.formDisciplinaIncluir.patchValue({ inicio: turma.inicio});
            // });
        //}
    }

    formDisciplinaIncluir: FormGroup;
    public idDisciplina: string;
    disciplina: Disciplina;

    get descricao() {
        return this.formDisciplinaIncluir.get('descricao').value;
    }

    get sigla() {
        return this.formDisciplinaIncluir.get('sigla').value;
    }

    get cargaHoraria() {
        return this.formDisciplinaIncluir.get('cargaHoraria').value;
    }

    // getTurmaById(): void {
    //     this.turmaByIdService.Get(this.turmaId).subscribe( turma => {
    //         console.log('getTurmaById: ', turma);
    //     });
    // }

    constructor(
        private global: GlobalService,
        private disciplinaIncluirService: DisciplinaIncluirService,
        private disciplinaAlterarService: DisciplinaAlterarService,
        //private turmaByIdService: TurmaGetByIdService
    ) {
        super();
        this.formDisciplinaIncluir = new FormGroup({
            descricao: new FormControl('', [Validators.required]),
            sigla: new FormControl('', [Validators.required]),
            cargaHoraria: new FormControl('', [Validators.required, Validators.min(8), Validators.max(80)]),
        });
    }

    ngOnInit(): void {

    }

    public validForm(): boolean {
        return this.formDisciplinaIncluir.valid;
    }

    save(): void {
        this.alterar(this.idDisciplina);
    }

    alterar(id: string): void {
        alert('alterar disciplina');
        // if (this.formDisciplinaIncluir.valid) {
        //     console.log('incluindo disciplina: ', this);

        //     let disciplinas: Array<Disciplina> = [];

        //     this.disciplinaByIdService.Get(this.idDisciplina).subscribe( disciplina => {
                
        //         this.disciplinaAlterarService.Post(disciplina).subscribe( callback => {
        //             this.global.msg.displayMessage({
        //                 messageType: ShowMessageType.NotificationSuccess,
        //                 messageText: 'disciplina incluida com sucesso'
        //             });
        //             }
        //         );
        //     });
        // } else {
        //     this.global.msg.displayMessage({
        //         messageType: ShowMessageType.NotificationInformation,
        //         messageText: 'Não é possivel alterar a disciplina. Faltam informações obrigatórias'
        //     });
        // }
    }

    incluir() {
        if (this.formDisciplinaIncluir.valid) {
            const disciplina: Disciplina = {
                id: this.idDisciplina,
                descricao: this.descricao,
                sigla: this.sigla,
                cargaHoraria: this.cargaHoraria,
            };

            this.disciplinaIncluirService.Post(disciplina).subscribe( callback => {
                console.log('this.disciplinaIncluirService: ', callback);
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
}

