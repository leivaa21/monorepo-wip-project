import { InjectableObject } from "../../dependencyInjection/Injector.entity"
import { Constructor } from "../../types"

export type CommandHandlerOptions = {
  Command: Constructor<Object>,
  deps?: Constructor<InjectableObject>[] 
}