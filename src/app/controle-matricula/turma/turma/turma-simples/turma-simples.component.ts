import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../base/base.component';
import { Turma } from '../../entities/turma.entitiy';
import { GlobalService } from 'totvs-log-web-foundation';
import { TurmaIncluirService } from '../../services/turma-incluir.service';
import { TurmaAlterarService } from '../../services/turma-alterar.service';
import { ShowMessageType } from 'totvs-log-base-foundation';
import { TurmaGetByIdService } from '../../services/turma-get-by-id.service';
import { Observable } from 'rxjs';
import { ITurma } from '../../entities/turma.interface';

@Component({
    selector:  'app-turma-simples',
    templateUrl: './turma-simples.component.html',
    styleUrls: ['./turma-simples.component.css']
})
export class TurmaSimplesComponent extends BaseComponent implements OnInit {

    @Input() set turmaId(x) {
        this.idTurma = x;
        if (this.formTurmaSimples && this.idTurma) {

            this.turmaByIdService.Get(this.idTurma).subscribe( turma => {
                this.idTurma = turma.id;

                this.formTurmaSimples.patchValue({ descricao: turma.descricao});
                this.formTurmaSimples.patchValue({ nrVagas: turma.nrVagas});
                this.formTurmaSimples.patchValue({ inicio: turma.inicio});
            });
        }
    }

    formTurmaSimples: FormGroup;
    public idTurma: string;

    get descricao() {
        return this.formTurmaSimples.get('descricao').value;
    }

    get nrVagas() {
        return this.formTurmaSimples.get('nrVagas').value;
    }

    get inicio() {
        return this.formTurmaSimples.get('inicio').value;
    }

    getTurmaById(): void {
        this.turmaByIdService.Get(this.idTurma).subscribe( turma => {

        });
    }

    constructor(
        private global: GlobalService,
        private turmaIncluirService: TurmaIncluirService,
        private turmaAlterarService: TurmaAlterarService,
        private turmaByIdService: TurmaGetByIdService
    ) {
        super();
        this.formTurmaSimples = new FormGroup({
            descricao: new FormControl('', [Validators.required]),
            nrVagas: new FormControl('', [Validators.required, Validators.min(1), Validators.max(175)]),
            inicio: new FormControl('', [Validators.required])
        });
    }

    ngOnInit(): void {

    }

    public validForm(): boolean {
        return this.formTurmaSimples.valid;
    }

    save(): void {
        if (this.idTurma) {
            this.alterar(this.idTurma);
        } else {
            this.salvar();
        }
    }

    alterar(id: string): void {
        if (this.formTurmaSimples.valid) {
            this.alterarando(id).subscribe( callback => {
                this.global.msg.displayMessage({
                    messageType: ShowMessageType.NotificationSuccess,
                    messageText: 'turma alterada com sucesso'
                });
                }
            );

        } else {
            this.global.msg.displayMessage({
                messageType: ShowMessageType.NotificationInformation,
                messageText: 'Não é possivel alterar a turma. Faltam informações obrigatórias'
            });
        }
    }

    salvar(): void {
        if (this.formTurmaSimples.valid) {
            this.salvando().subscribe( callback => {
                this.idTurma = callback;

                this.global.msg.displayMessage({
                    messageType: ShowMessageType.NotificationSuccess,
                    messageText: this.global.i18n.literals.turmaSalvaComSucesso
                });
            });

        } else {
            this.global.msg.displayMessage({
                messageType: ShowMessageType.NotificationInformation,
                messageText: 'Não é possivel salvar a turma. Faltam informações obrigatórias'
            });
        }
    }

    salvando(): Observable<string> {
        const turma: Turma = {
            id: this.idTurma,
            descricao: this.descricao,
            inicio: this.inicio,
            nrVagas: this.nrVagas,
            listDisciplinas: [],
            listAlunos: []
        };

        return this.turmaIncluirService.Post(turma);
    }

    alterarando(id: string): Observable<ITurma> {
        const turma: Turma = {
            id: this.idTurma,
            descricao: this.descricao,
            inicio: this.inicio,
            nrVagas: this.nrVagas,
            listDisciplinas: [],
            listAlunos: []
        };

        return this.turmaAlterarService.Post(turma);
    }
}
