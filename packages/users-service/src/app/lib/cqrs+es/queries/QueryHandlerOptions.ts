import { InjectableObject } from "../../dependencyInjection/Injector.entity"
import { Constructor } from "../../types"

export type QueryHandlerOptions = {
  Query: Constructor<Object>,
  deps?: Constructor<InjectableObject>[] 
}