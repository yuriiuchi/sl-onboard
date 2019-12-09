import { dataService } from './../../../src/app/memory/data-service/data-service-mapper';
import { InMemoryDataService, IResponseUtils } from './../../../src/app/memory/data-service/in-memory-data.service';
import { STATUS } from 'angular-in-memory-web-api';

const collectionName = 'userinfo';

const authorization = {
  // tslint:disable-next-line: max-line-length
  id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiYjZmYzUyM2ZjNzQwZjI4NmMxOTZmY2ExMzUyNzE2IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NjE2NDM5NTEsImV4cCI6MTU2MTY0NTA5MSwiaXNzIjoiaHR0cDovL3RvdHZzLmxvZ2lzdGljYS5zdWl0ZXRvdHZzLjEwLjgwLjEyOS4xODAueGlwLmlvL3RvdHZzLnJhYyIsImF1ZCI6IndtcyIsIm5vbmNlIjoiNGI4N2M0ZTAyNWM5NDIxYTk3ODdhNmM1ZmEzMGY5MzIiLCJpYXQiOjE1NjE2NDM5NTEsImF0X2hhc2giOiJiQWllbWhfOWJYbU9yOUloeVpVVEVRIiwic2lkIjoiODE0Y2MxZDVjNDZiMzAyYjAyODUwZWEwZmUzYjgwNmYiLCJzdWIiOiIxNyIsImF1dGhfdGltZSI6MTU2MTY0MjgxMCwiaWRwIjoibG9jYWwiLCJodHRwOi8vd3d3LnRuZi5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudElkIjoiMSIsImFtciI6WyJwd2QiXX0.SZwKrEck2IifEt-U6TL95qY3-7LLSuufJWEM3zx8bP2Oo0QVHw36EK517DbTn4g6UqS9BEnTekoOmLp6g4stxg3t8c-3pvLP8m5r0g2S_ZgVacAj4j27WMc5D8WKvaQXzZFuib_sn00melPxFqpXSpbN-bzeK1gbHe2N0HVlAqd28ujM4A41icwq_awj2i84n5fQiLGgJw-grslBu3BPfni-WmBWzrbKBLekXD2MspDpCuVZC2ddY4LeSo7ZHA6K6oMZ9U7SdcC4y0gzVoKrlHpTpPrGIRUgkF7WerpH6YSz36HP5jQiuRhYzzJ9Kkv_RKZSc170bQa87FNKcxFd6A',
  session_state: 'EgTGgM_XygRkK-EaBaa6PbUQfAEFKNWk29p3OFV1vi8.72f2f788b279202b716310b36b6c5951',
  // tslint:disable-next-line: max-line-length
  access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiYjZmYzUyM2ZjNzQwZjI4NmMxOTZmY2ExMzUyNzE2IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NjE2NDM5NTEsImV4cCI6MTU2MTY0NTE1MSwiaXNzIjoiaHR0cDovL3RvdHZzLmxvZ2lzdGljYS5zdWl0ZXRvdHZzLjEwLjgwLjEyOS4xODAueGlwLmlvL3RvdHZzLnJhYyIsImF1ZCI6WyJodHRwOi8vdG90dnMubG9naXN0aWNhLnN1aXRldG90dnMuMTAuODAuMTI5LjE4MC54aXAuaW8vdG90dnMucmFjL3Jlc291cmNlcyIsImF1dGhvcml6YXRpb25fYXBpIl0sImNsaWVudF9pZCI6IndtcyIsInN1YiI6IjE3IiwiYXV0aF90aW1lIjoxNTYxNjQyODEwLCJpZHAiOiJsb2NhbCIsImh0dHA6Ly93d3cudG5mLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOlsiMSIsIjEiXSwicm9sZSI6IkFkbWluIiwiaHR0cDovL3d3dy50bmYuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnROYW1lIjoidG90dnMiLCJodHRwOi8vd3d3LnRuZi5jb20vaWRlbnRpdHkvY2xhaW1zL3RlbmFudEZ1bGxOYW1lIjoiVE9UVlMiLCJodHRwOi8vd3d3LnRuZi5jb20vaWRlbnRpdHkvY2xhaW1zL3VzZXJGdWxsbmFtZSI6Ik1hdGV1cyBMZWFsIiwibmFtZSI6WyJtYXRldXMubGVhbCIsIk1hdGV1cyBMZWFsIl0sInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsImF1dGhvcml6YXRpb25fYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbInB3ZCJdfQ.p0FG8OL--YvLCb_T64zMkevEQB6Y229rcT_pnFBS9v8r7JFnGNzxtED7A_CXSS1PQ6RwEFDLK7uLEmnHo5XxHJmhnepd3Q3eigaqech-Tkzj91qVcn3dSy6tA7tLWaNzqH9Jk_QyzwdHyXN8y0M-ld6VpesQ85cROYDZcy8ASdVtrnZ8uDPJYD6wIdB9f7y3K8a8Q_JsVbMBcbjVn0q-gy6d0TRKzCAT_MfAYUvNsYeY8oa42wXOjoJpyQOhdPgStl-Ei2O2yRPrxgEIqz3r4297EanKr1s09g16MVAVsAcxfn3m-o1Lc9VAo0y5_tFySHuXL9Gw0FaQMJ0k0NkUuQ',
  token_type: 'Bearer',
  scope: 'openid profile email authorization_api offline_access',
  profile: {
      nbf: 1561643951,
      exp: 1561645091,
      iss: 'http://totvs.logistica.suitetotvs.10.80.129.180.xip.io/totvs.rac',
      aud: 'wms',
      nonce: '4b87c4e025c9421a9787a6c5fa30f932',
      iat: 1561643951,
      at_hash: 'bAiemh_9bXmOr9IhyZUTEQ',
      sid: '814cc1d5c46b302b02850ea0fe3b806f',
      sub: '17',
      auth_time: 1561642810,
      idp: 'local',
      'http://www.tnf.com/identity/claims/tenantId': '1',
      amr: [
          'pwd'
      ],
      name: [
          'yuri.iuchi',
          'Yuri Iuchi'
      ],
      email: 'yuri.iuchi@totvs.com.br',
      roles: [
          'Admin'
      ]
  },
  expires_at: 1561645281
};

dataService(collectionName, (dbService: InMemoryDataService) => {

  dbService.addRequestInterceptor({
    method: 'GET',
    path: `/api/${collectionName}`,
    response: (url: string, utils: IResponseUtils) => {
      return utils.responseFn(url, STATUS.OK, authorization);
    }
  });
});
