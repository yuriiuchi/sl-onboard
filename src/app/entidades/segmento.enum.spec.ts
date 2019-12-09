import { SegmentoEnum } from './segmento.enum';

describe('segmento.enum.spec | SegmentoEnum', () => {
  it('should create an instance', () => {
    expect(SegmentoEnum.values.length).toBe(5);
    expect(SegmentoEnum.values[0]).toEqual(SegmentoEnum.OPERADOR_LOGISTICO());
    expect(SegmentoEnum.values[1]).toEqual(SegmentoEnum.RECINTO_ADUANEIRO());
    expect(SegmentoEnum.values[2]).toEqual(SegmentoEnum.DISTRIBUIDOR());
    expect(SegmentoEnum.values[3]).toEqual(SegmentoEnum.INDUSTRIA());
    expect(SegmentoEnum.values[4]).toEqual(SegmentoEnum.VAREJO());
  });
});
