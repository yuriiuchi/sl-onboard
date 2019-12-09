import { OnInit, Component } from '@angular/core'

import { GlobalService } from 'totvs-log-web-foundation';

import { PoPageAction, PoButtonGroupItem } from '@portinari/portinari-ui';

@Component({
    selector:  'app-turma',
    templateUrl: './turma.component.html',
    styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit{
    
    // public actions: Array<PoPageAction> = [
    //     {
    //         label: 'Nova Turma',
    //         url: 'controle-matricula/turma/incluir',
    //         action: ()=>{
    //             alert('Action Turma Incluir')
    //         },
    //         disabled: undefined,
    //         icon: 'thf-icon-plus'
    //     }
    // ]

    botoesAbas: Array<PoButtonGroupItem>
    esconderTurmaSimples: boolean = false;
    
    constructor(public global: GlobalService){

    }

    public onChangeIdiomas(){
        
    }

    escondaTurmaSimples(): void{ 
        this.esconderTurmaSimples = true;
    }

    mostreTurmaSimples(): void{ 
        this.esconderTurmaSimples = false;
    }

    criarBotoesAbas(){
        this.botoesAbas = [
            {
              selected: true,
              label: "Dados básicos",
              action: this.mostreTurmaSimples.bind(this)
            },
            {
              selected: false,
              label: "Complemento",
              action: this.escondaTurmaSimples.bind(this)
            }
        ];
    }

    ngOnInit(): void{
        this.onChangeIdiomas();
        this.criarBotoesAbas();
    }
}