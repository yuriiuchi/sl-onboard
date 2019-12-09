import { ControleWmsEnum } from './controle-wms-enum';

describe('controle-wms-enum.spec | ControleWmsEnum', () => {
  it('should create an instance', () => {
    expect(ControleWmsEnum.values.length).toBe(2);
    expect(ControleWmsEnum.values[0]).toEqual(ControleWmsEnum.WES());
    expect(ControleWmsEnum.values[1]).toEqual(ControleWmsEnum.WMS());
  });
});
