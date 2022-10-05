import { InjectableObject } from "../../../dependencyInjection/Injector.entity";
import { Constructor } from "../../../types";

export interface RouteOptions {
  router?: string,
  path?: string,
  deps?: Constructor<InjectableObject>[]
}