class HttpRoute {
  private readonly _sections: Array<string> = new Array<string>();
  private readonly _params: Array<string> = new Array<string>();
  private readonly _paramsIndexInSections: Array<number> = new Array<number>();

  constructor(
    private readonly url: string,
  ) {
    this._sections = this.url.split('/').filter(section => section !== '');
    this._params = this._sections.filter(section => section.startsWith(':'))
  
    this._paramsIndexInSections = this._sections.map((val, index) => {
      if (this._params.includes(val)) return index;
      return undefined;
    }).filter(val => val !== undefined) as Array<number>;
  }


  doRouteMatch(url: string): boolean {
    
    const urlSections = url.split('/').filter(sec => sec !== '');
    
    if (this._sections.length !== urlSections.length) return false;
    
    try {
      this._sections.map((section: string, index: number) => {
        if (this._paramsIndexInSections.includes(index)) {
          return;
        }
        if (section !== urlSections[index]) {
          throw Error('not equal')
        };
      })
    } catch (e) {
      return false;
    }
    
    return true;
  }

  getParams(url: string): Map<string, string> {
    const urlSections = url.split('/').filter(sec => sec !== '');
    const ParamsMap = new Map<string, string>();
    
    if (this._sections.length !== urlSections.length) throw Error('Url does not match!');
    
    this._sections.map((section: string, index: number) => {
      if (this._paramsIndexInSections.includes(index)) {
        ParamsMap.set(section.slice(1), urlSections[index]);
        return;
      }
      if (section !== urlSections[index]) {
        throw Error('Url does not equal')
      };
    })

    return ParamsMap;
  }
}

export default HttpRoute;