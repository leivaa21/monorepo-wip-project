import Injector from '../../../../../src/app/lib/dependencyInjection/Injector.entity';
import Injectable from '../../../../../src/app/lib/dependencyInjection/decorators/inectable.decorator';
import UndefinedDependenciesOnDecoratorException from '../../../../../src/app/lib/dependencyInjection/exceptions/UndefinedDependenciesOnDecorator';
import DependenciesDoesNotMatchException from '../../../../../src/app/lib/dependencyInjection/exceptions/DependenciesDoesNotMatch';


beforeEach(() => {
  Injector.clear();
})
it('Should auto register a injectable with no deps when the decorator without params', () => {

  @Injectable()
  class InjectableByDecorator {
    static readonly message = 'Hello world'
    get exampleMessage() { return InjectableByDecorator.message; }
  }

  expect(Injector.getInstance().injectableCount).toBe(1);
  expect(Injector.getInstance().buildInjectable(InjectableByDecorator.name)).toBeInstanceOf(InjectableByDecorator);

})

it('Should auto register a injectable with deps when the decorator with params', () => {
  @Injectable()
  class DependencyByDecorator {
    public readonly message = 'test';
  }

  @Injectable({
    deps: [DependencyByDecorator]
  })
  class InjectableByDecorator {
    static readonly message = 'Hello world'
    constructor(public readonly dep1: DependencyByDecorator) {}
  }

  expect(
    Injector
      .getInstance()
      .injectableCount
  ).toBe(2);

  expect(
    Injector
      .getInstance()
      .buildInjectable<InjectableByDecorator>(InjectableByDecorator.name)
  ).toBeInstanceOf(InjectableByDecorator);
  
  expect(
    Injector
      .getInstance()
      .buildInjectable<InjectableByDecorator>(InjectableByDecorator.name).dep1
  ).toBeInstanceOf(DependencyByDecorator);

})

it('Should throw exception if deps are not defined in decorator', () => {
  
  class DependencyByDecorator {
    public readonly message = 'test';
  }

  expect(() => {
    @Injectable()
    class InjectableByDecorator {
      static readonly message = 'Hello world'
      constructor(public readonly dep1: DependencyByDecorator) { }
    }
  }).toThrow(UndefinedDependenciesOnDecoratorException);

});

it('Should throw exception if deps length do not match', () => {
  
  class DependencyByDecorator {
    public readonly message = 'test';
  }

  expect(() => {
    @Injectable({deps: []})
    class InjectableByDecorator {
      static readonly message = 'Hello world'
      constructor(public readonly dep1: DependencyByDecorator) { }
    }
  }).toThrow(DependenciesDoesNotMatchException);

  expect(() => {
    @Injectable({deps: [DependencyByDecorator, DependencyByDecorator]})
    class InjectableByDecorator {
      static readonly message = 'Hello world'
      constructor(public readonly dep1: DependencyByDecorator) { }
    }
  }).toThrow(DependenciesDoesNotMatchException);

});