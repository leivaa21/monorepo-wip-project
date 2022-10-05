import { Constructor } from "../types";
import DuplicatedInjectableException from "./exceptions/DuplicatedInjectable";
import InjectableNotFoundException from "./exceptions/InjectableNotFound";

export type InjectableObject = any;
export type InjectableTag = string;
export type InjectableInfo = {
  constructor: Constructor<InjectableObject>
  deps?: Constructor<InjectableObject>[]
}

class Injector {
  private static instance?: Injector = undefined;

  private constructor(
    private readonly injectables: Map<InjectableTag, InjectableInfo>
  ) { }
  
  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new this(new Map<InjectableTag, InjectableInfo>());
    }
    return this.instance;
  }

  public static clear() {
    this.instance = undefined;
  }

  registerInjectable(info: InjectableInfo) {
    if (this.injectables.get(info.constructor.name)) 
      throw new DuplicatedInjectableException(info.constructor.name);
    this.injectables.set(info.constructor.name, info);
  }

  buildInjectable<T>(injectableTag: InjectableTag): T {
    const info = this.injectables.get(injectableTag);
    if (info === undefined)
      throw new InjectableNotFoundException(injectableTag);

    if (info.deps === undefined || info.deps.length === 0)
      return new info.constructor();

    const dependencies = info.deps.map((dependency) => this.buildInjectable(dependency.name))
    return new info.constructor(...dependencies);

  }

  get injectableCount() { return this.injectables.size; }

}

export default Injector;
