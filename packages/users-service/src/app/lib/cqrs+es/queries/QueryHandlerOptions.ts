import { InjectableObject } from "../../dependencyInjection/Injector.entity"
import { Constructor } from "../../types"
import { Query } from "./Query"

export type QueryHandlerOptions = {
  Query: Constructor<Query>,
  deps?: Constructor<InjectableObject>[] 
}