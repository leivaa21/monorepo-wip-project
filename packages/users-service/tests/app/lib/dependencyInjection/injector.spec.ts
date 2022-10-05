import DuplicatedInjectableException from '../../../../src/app/lib/dependencyInjection/exceptions/DuplicatedInjectable';
import InjectableNotFoundException from '../../../../src/app/lib/dependencyInjection/exceptions/InjectableNotFound';
import Injector from '../../../../src/app/lib/dependencyInjection/Injector.entity';

describe('Injector can register injectables', () => {

  afterEach(() => {
    Injector.clear();
  })
  it('Should let inject a dependency without ', () => {
    
    class exampleInjectable {
      private readonly xd = 'xd';
      constructor() { }
      get msg() {
        return this.xd;
      } 
    }
    expect(Injector.getInstance().injectableCount).toBe(0);

    Injector.getInstance().registerInjectable({ constructor: exampleInjectable });
    
    expect(Injector.getInstance().injectableCount).toBe(1);
  })


  it('Should let inject an injectable with dependencies', () => {
    class dependency1 {
      get msg() { return 'Hello'; }
    }
    class dependency2 {
      get number() { return 1; }
    }

    class ExampleInjectable {
      constructor(
        private readonly dep1: dependency1,
        private readonly dep2: dependency2
      ) { }
      get combo() { return `${this.dep1.msg} ${this.dep2.number}` }  
    }
    
    expect(Injector.getInstance().injectableCount).toBe(0);

    Injector.getInstance().registerInjectable({ constructor: ExampleInjectable, deps: [dependency1, dependency2] });
    
    expect(Injector.getInstance().injectableCount).toBe(1);
  })


  it('Should throw error when tries to duplicate Injectable', () => {

    class ExampleInjectable {
      constructor(
      ) { }
      get msg() { return 'lol' }
    }

    expect(Injector.getInstance().injectableCount).toBe(0);

    Injector.getInstance().registerInjectable({ constructor: ExampleInjectable });
    
    expect(Injector.getInstance().injectableCount).toBe(1);
    
    expect(() => Injector.getInstance().registerInjectable({ constructor: ExampleInjectable })).toThrow(DuplicatedInjectableException);

  });
});


describe('Building Injectables from injector', () => {

  class Injectable1 {
    constructor(public readonly dep1: Dependency1) { }
    get status() {return 'ok'}
  }

  class Dependency1 {
    public static readonly message = ' from Dependency1';
    constructor(public readonly subDependency: SubDependency1) { }
    get method() { return this.subDependency.msg +  Dependency1.message; }
  }

  class SubDependency1 {
    static readonly message = 'Hello World'
    get msg() {return SubDependency1.message}
  }

  class Injectable2 {
    constructor(public readonly dep1: Injectable1, public readonly dep2: Dependency1) {}
  }


  beforeAll(() => {
    Injector.getInstance().registerInjectable({constructor: Injectable1, deps: [Dependency1]})
    Injector.getInstance().registerInjectable({constructor: Dependency1, deps: [SubDependency1]})
    Injector.getInstance().registerInjectable({constructor: SubDependency1 })
    Injector.getInstance().registerInjectable({constructor: Injectable2, deps: [Injectable1, Dependency1]})
  })


  test('Building a Injectable with no dependencies', () => {
    const buildedInjectable = Injector.getInstance().buildInjectable<SubDependency1>(SubDependency1.name)
    expect(buildedInjectable).toBeInstanceOf(SubDependency1);
  });

  test('Building a Injectable with simple dependencies', () => {
    const buildedInjectable = Injector.getInstance().buildInjectable<Dependency1>(Dependency1.name)
    expect(buildedInjectable).toBeInstanceOf(Dependency1);
    expect(buildedInjectable.subDependency).toBeInstanceOf(SubDependency1);
  })

  test('Bulding a Injectable with dependencies that has deps', () => {
    const buildedInjectable = Injector.getInstance().buildInjectable<Injectable1>(Injectable1.name)
    expect(buildedInjectable).toBeInstanceOf(Injectable1);
    expect(buildedInjectable.status).toBe('ok');
  })

  test('Bulding a Injectable with multiple dependencies', () => {
    const buildedInjectable = Injector.getInstance().buildInjectable<Injectable2>(Injectable2.name)
    expect(buildedInjectable).toBeInstanceOf(Injectable2);
    expect(buildedInjectable.dep2).toBeInstanceOf(Dependency1);
  })

  it('Should throw expception if Injectable is not found when building', () => {
    expect(() => Injector.getInstance().buildInjectable('asdasgfsdfgowhe')).toThrow(InjectableNotFoundException);
  })

})