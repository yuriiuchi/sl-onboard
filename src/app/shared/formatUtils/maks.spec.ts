import { maskBr } from './mask';

describe('maks.spec | Mask', () => {
    it('Testando máscara CPF', () => {
        const mask = maskBr.cpf('10653920954');
        expect(mask).toEqual('106.539.209-54');
    });
    it('Testando máscara CNPJ', () => {
        const mask = maskBr.cnpj('66209101000185');
        expect(mask).toEqual('66.209.101/0001-85');
    });

    it('Testando máscara Inscrição Estadual AC', () => {
        const mask = maskBr.inscricaoestadual('0115071723913', 'AC');
        expect(mask).toEqual('01.150.717/239-13');
    });

    it('Testando máscara Inscrição Estadual AL', () => {
        const mask = maskBr.inscricaoestadual('248928759', 'AL');
        expect(mask).toEqual('248928759');
    });
    it('Testando máscara Inscrição Estadual AP', () => {
        const mask = maskBr.inscricaoestadual('035462728', 'AP');
        expect(mask).toEqual('035462728');
    });
    it('Testando máscara Inscrição Estadual AM', () => {
        const mask = maskBr.inscricaoestadual('816262225', 'AM');
        expect(mask).toEqual('81.626.222-5');
    });
    it('Testando máscara Inscrição Estadual BA', () => {
        const mask = maskBr.inscricaoestadual('48351478', 'BA');
        expect(mask).toEqual('483514-78');
    });
    it('Testando máscara Inscrição Estadual CE', () => {
        const mask = maskBr.inscricaoestadual('766699404', 'CE');
        expect(mask).toEqual('76669940-4');
    });
    it('Testando máscara Inscrição Estadual DF', () => {
        const mask = maskBr.inscricaoestadual('0709734200151', 'DF');
        expect(mask).toEqual('07097342001-51');
    });
    it('Testando máscara Inscrição Estadual ES', () => {
        const mask = maskBr.inscricaoestadual('089061764', 'ES');
        expect(mask).toEqual('08906176-4');
    });
    it('Testando máscara Inscrição Estadual GO', () => {
        const mask = maskBr.inscricaoestadual('104026600', 'GO');
        expect(mask).toEqual('10.402.660-0');
    });
    it('Testando máscara Inscrição Estadual MA', () => {
        const mask = maskBr.inscricaoestadual('128614161', 'MA');
        expect(mask).toEqual('12861416-1');
    });
    it('Testando máscara Inscrição Estadual MT', () => {
        const mask = maskBr.inscricaoestadual('56301717414', 'MT');
        expect(mask).toEqual('5630171741-4');
    });
    it('Testando máscara Inscrição Estadual MS', () => {
        const mask = maskBr.inscricaoestadual('285870718', 'MS');
        expect(mask).toEqual('28587071-8');
    });
    it('Testando máscara Inscrição Estadual MG', () => {
        const mask = maskBr.inscricaoestadual('5396347388848', 'MG');
        expect(mask).toEqual('539.634.738/8848');
    });
    it('Testando máscara Inscrição Estadual PA', () => {
        const mask = maskBr.inscricaoestadual('154235555', 'PA');
        expect(mask).toEqual('15-423555-5');
    });
    it('Testando máscara Inscrição Estadual PB', () => {
        const mask = maskBr.inscricaoestadual('609627970', 'PB');
        expect(mask).toEqual('60962797-0');
    });
    it('Testando máscara Inscrição Estadual PR', () => {
        const mask = maskBr.inscricaoestadual('8176097104', 'PR');
        expect(mask).toEqual('817.60971-04');
    });
    it('Testando máscara Inscrição Estadual PE', () => {
        const mask = maskBr.inscricaoestadual('858321971', 'PE');
        expect(mask).toEqual('8583219-71');
    });
    it('Testando máscara Inscrição Estadual PI', () => {
        const mask = maskBr.inscricaoestadual('435775030', 'PI');
        expect(mask).toEqual('43577503-0');
    });
    it('Testando máscara Inscrição Estadual RJ', () => {
        const mask = maskBr.inscricaoestadual('50915549', 'RJ');
        expect(mask).toEqual('50.915.54-9');
    });
    it('Testando máscara Inscrição Estadual RN', () => {
        const mask = maskBr.inscricaoestadual('202708276', 'RN');
        expect(mask).toEqual('20.270.827-6');
    });
    it('Testando máscara Inscrição Estadual RS', () => {
        const mask = maskBr.inscricaoestadual('7616498320', 'RS');
        expect(mask).toEqual('761/6498320');
    });
    it('Testando máscara Inscrição Estadual RO', () => {
        const mask = maskBr.inscricaoestadual('92733653060346', 'RO');
        expect(mask).toEqual('9273365306034-6');
    });
    it('Testando máscara Inscrição Estadual RR', () => {
        const mask = maskBr.inscricaoestadual('241136103', 'RR');
        expect(mask).toEqual('24113610-3');
    });
    it('Testando máscara Inscrição Estadual SC', () => {
        const mask = maskBr.inscricaoestadual('780159527', 'SC');
        expect(mask).toEqual('780.159.527');
    });
    it('Testando máscara Inscrição Estadual SP', () => {
        const mask = maskBr.inscricaoestadual('543424961268', 'SP');
        expect(mask).toEqual('543.424.961.268');
    });
    it('Testando máscara Inscrição Estadual SE', () => {
        const mask = maskBr.inscricaoestadual('386924325', 'SE');
        expect(mask).toEqual('38692432-5');
    });
    it('Testando máscara Inscrição Estadual TO', () => {
        const mask = maskBr.inscricaoestadual('72039938069', 'TO');
        expect(mask).toEqual('7203993806-9');
    });
});
