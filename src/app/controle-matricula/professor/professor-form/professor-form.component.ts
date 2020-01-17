import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BaseComponent } from '../../../base/base.component';
import { GlobalService } from 'totvs-log-web-foundation';
import { ProfessorIncluirService } from '../services/professor-incluir.service';
import { Professor } from '../entities/professor.entity';
import { ProfessorAlterarService } from '../services/professor-alterar.service';
import { cpfValidator, ShowMessageType } from 'totvs-log-base-foundation';
@Component({
    selector: 'app-professor-form',
    templateUrl: './professor-form.component.html',
    styleUrls: ['./professor-form.component.css']
})
export class ProfessorFormComponent extends BaseComponent implements OnInit {

    private formProfessor: FormGroup;
    private titulacaoList = [];

    professorId: string;
    constructor(
        private global: GlobalService,
        private professorIncluirService: ProfessorIncluirService,
        private professorAlterarService: ProfessorAlterarService) {
        super();

        this.formProfessor = new FormGroup({
            nome: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            cpf: new FormControl('', [Validators.required, cpfValidator()]),
            titulacao: new FormControl('', [Validators.required])
        });

    }

    ngOnInit() {
        this.carregarTitulacaoList();
    }

    public validForm(): boolean {
        return this.formProfessor.valid;
    }

    salvar(): void {
        if (this.formProfessor.valid) {
            const professor = new Professor(
                this.professorId,
                this.formProfessor.get('nome').value,
                this.formProfessor.get('email').value,
                this.formProfessor.get('cpf').value,
                this.formProfessor.get('titulacao').value
            );

            if (!this.professorId) {
                this.professorIncluirService.Post(professor).subscribe(calback => {
                    this.professorId = calback;
                    this.global.msg.displayMessage({
                        messageType: ShowMessageType.NotificationSuccess,
                        messageText: 'Professor incluido com sucesso'
                    });
                });
            } else {
                alert('alteração de professor desenvolvimento');
            }
        } else {
            this.global.msg.displayMessage({
                messageType: ShowMessageType.NotificationInformation,
                messageText: 'Não é possivel salvar o professor. Faltam informações obrigatórias'
            });
        }
    }

    carregarTitulacaoList(): void {
        this.titulacaoList = [{ value: 'Mestre' }, { value: 'Doutor' }, { value: 'PHD' }];
    }

}
