import { Component, OnInit } from "@angular/core";
import { PoBreadcrumb } from '@portinari/portinari-ui';
import { GlobalService } from 'totvs-log-web-foundation';

@Component({
    selector: 'app-controle-matricula',
    templateUrl: './controle-matricula.component.html',
    styleUrls: ['./controle-matricula.component.css']
})
export class ControleMatriculaComponent implements OnInit {
    
    public breadcrumbs: PoBreadcrumb;
    
    constructor(private global: GlobalService) {

    }

    private onChangeIdiomas(): void {
        this.criarBreadcrumb();
    }

    ngOnInit(): void {
        this.onChangeIdiomas();
    }

    private criarBreadcrumb(): void {
        this.breadcrumbs = {
          items: [
            { label: this.global.i18n.literals.home, link: '/' },
            { label: this.global.i18n.literals.controleMatricula, link: '/controle-matricula' },
          ]
        };
    }
}
