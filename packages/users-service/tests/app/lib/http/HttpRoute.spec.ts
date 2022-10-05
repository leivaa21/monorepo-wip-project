import HttpRoute from "../../../../src/app/lib/http/HttRoute";

describe('Testing route matches', () => {
  test('Simple route', () => {
    const path = '/route'
    const get = new HttpRoute(path,);
    expect(get.doRouteMatch(path)).toBeTruthy();
    expect(get.doRouteMatch('/example')).toBeFalsy();

  })
  test('Route with param in the last section', () => {
    const path = '/asd/adfasd'
    const route = new HttpRoute(path + '/:id');
    expect(route.doRouteMatch('/asd/adfasd/1341235-er214523-3245234')).toBeTruthy();
    expect(route.doRouteMatch('/asd/1341235-er214523-3245234/adfsad/')).toBeFalsy();
    expect(route.doRouteMatch('/asd/adfasd/1341235-er214523-3245234/adfasdf/')).toBeFalsy();
  })

  test('Route with param in the middle of the section', () => {
    const pathFirst = 'api/users'
    const pathLast = '/info'
    const route = new HttpRoute(`${pathFirst}/:id${pathLast}`);

    expect(route.doRouteMatch(`/${pathFirst}/userid-1234-21512-42134/${pathLast}`)).toBeTruthy()
    expect(route.doRouteMatch(`/${pathFirst}/asdaf-3442134-sfadfa/${pathLast}`)).toBeTruthy()
    expect(route.doRouteMatch(`/${pathFirst}/${pathLast}/asdaf-3442134-sfadfa/`)).toBeFalsy()
    
  })

});

describe('Testing params getting from url', () => {

  test('Getting 1 param from url', () => {

    const pathRoute = '/api/users/:id'
    const exampleID = 'afdsagr2-24523tas-gsafg3245-fwq'
    const pathRequest = '/api/users/' + exampleID;

    const route = new HttpRoute(pathRoute);
    const params = route.getParams(pathRequest);
    expect(params).toBeInstanceOf(Map);
    expect(params.get('id')).toBeDefined();
    expect(params.get('id')).toBe(exampleID);


  });
  test('Getting multiple params from url', () => {

    const pathRoute = '/api/users/:id/request/:reqid/status'
    const exampleID = 'afdsagr2-24523tas-gsafg3245-fwq'
    const exampleReqID = 'fasdfas-41245-sfdasf-2145'
    const pathRequest = `/api/users/${exampleID}/request/${exampleReqID}/status`;

    const route = new HttpRoute(pathRoute);
    const params = route.getParams(pathRequest);
    expect(params).toBeInstanceOf(Map);
    expect(params.get('id')).toBe(exampleID);
    expect(params.get('reqid')).toBe(exampleReqID);


  });

  test('Throws error if path doesnt match', () => {
    const pathRoute = '/api/users/:id'
    const pathRequest = 'asd/users/afsdfasdfasdf';
    const pathRequest2 = '/api/3asdasdfasds';
    const route = new HttpRoute(pathRoute);

    expect(() => route.getParams(pathRequest)).toThrow(Error);
    expect(() => route.getParams(pathRequest2)).toThrow(Error);
  })

})