import { Constructor } from "../../types";
import DependenicesDoesNotMatchException from "../exceptions/DependenciesDoesNotMatch";
import UndefinedDependenciesOnDecoratorException from "../exceptions/UndefinedDependenciesOnDecorator";
import Injector, { InjectableInfo, InjectableObject } from "../Injector.entity";

export type InjectableOptions = {
  deps: Constructor<InjectableObject>[]
}

export default function Injectable(options?: InjectableOptions) {
  return (constructor: Constructor<unknown>) => {
    const info: InjectableInfo = {
      constructor: constructor,
      deps: options?.deps,
    }

    if (info.deps === undefined && constructor.length !== 0) {
      throw new UndefinedDependenciesOnDecoratorException(constructor.name);
    }
    if (info.deps !== undefined && (info.deps.length !== constructor.length)) {
      throw new DependenicesDoesNotMatchException(constructor.name);
    }

    Injector.getInstance().registerInjectable(info);
  };
}